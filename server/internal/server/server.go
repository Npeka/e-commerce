package server

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/jmoiron/sqlx"
)

// Server struct manages the database connection.
type Server struct {
	db *sqlx.DB
}

// NewServer creates a new Server instance.
func NewServer(db *sqlx.DB) *Server {
	return &Server{db: db}
}

// Upgrader for WebSocket connections.
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// ClientManager struct manages connected WebSocket clients.
type ClientManager struct {
	mu      sync.Mutex
	clients map[string]*websocket.Conn // Map userID -> WebSocket connection
}

// NewClientManager creates a new instance of ClientManager.
func NewClientManager() *ClientManager {
	return &ClientManager{
		clients: make(map[string]*websocket.Conn),
	}
}

// AddClient adds a client to the client manager.
func (m *ClientManager) AddClient(userID string, client *websocket.Conn) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.clients[userID] = client
}

// RemoveClient removes a client from the client manager.
func (m *ClientManager) RemoveClient(userID string) {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.clients, userID)
}

// Broadcast sends a message to the intended recipient.
func (m *ClientManager) Broadcast(messageType int, message []byte) {
	type Msg struct {
		Sender    string `json:"sender"`
		Recipient string `json:"recipient"`
		Message   string `json:"message"`
	}

	// Parse the incoming message
	msg := Msg{}
	if err := json.Unmarshal(message, &msg); err != nil {
		log.Printf("Invalid message format: %v\n", err)
		return
	}

	m.mu.Lock()
	defer m.mu.Unlock()

	// Check if the recipient exists
	if recipientConn, ok := m.clients[msg.Recipient]; ok {
		msgBytes, err := json.Marshal(msg)
		if err != nil {
			log.Printf("Error marshalling message: %v\n", err)
			return
		}

		err = recipientConn.WriteMessage(messageType, msgBytes)
		if err != nil {
			log.Printf("Error sending message to recipient %s: %v\n", msg.Recipient, err)
			recipientConn.Close()
			delete(m.clients, msg.Recipient)
		}
	} else {
		log.Printf("Recipient %s not connected\n", msg.Recipient)
	}
}

// Run initializes the server and sets up routes.
func (s *Server) Run() error {
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.Default()
	s.MapHandler(r)
	pprof.Register(r)

	// clientManager := NewClientManager()

	// r.GET("/ws", func(c *gin.Context) {
	// 	userID := c.Query("user")
	// 	if userID == "" {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": "user parameter is required"})
	// 		return
	// 	}

	// 	// Upgrade the HTTP connection to a WebSocket connection
	// 	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	// 	if err != nil {
	// 		log.Printf("Failed to upgrade connection: %v\n", err)
	// 		return
	// 	}

	// 	clientManager.AddClient(userID, conn) // Add client to manager
	// 	defer func() {
	// 		clientManager.RemoveClient(userID)
	// 		conn.Close()
	// 		log.Printf("Client disconnected: %s\n", userID)
	// 	}()

	// 	log.Printf("Client connected: %s\n", userID)

	// 	// Handle incoming messages
	// 	for {
	// 		messageType, message, err := conn.ReadMessage()
	// 		if err != nil {
	// 			log.Printf("Error reading message: %v\n", err)
	// 			break
	// 		}
	// 		log.Printf("Message from %s: %s\n", userID, message)
	// 		clientManager.Broadcast(messageType, message)
	// 	}
	// })

	// Start the server
	log.Printf("Server running on port %s\n", port)
	return r.Run(":" + port)
}
