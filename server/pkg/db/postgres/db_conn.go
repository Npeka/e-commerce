package postgres

import (
	"log"
	"os"

	"github.com/jmoiron/sqlx"
)

func NewPostgreDB() (*sqlx.DB, error) {
	// Get environment variables
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")

	// String to connect to PostgreSQL
	connStr := "user=" + dbUser + " password=" + dbPassword + " dbname=" + dbName +
		" host=" + dbHost + " port=" + dbPort + " sslmode=disable"

	// Mở kết nối với PostgreSQL
	postgresDB, err := sqlx.Connect("postgres", connStr)
	if err != nil {
		log.Fatal("Error opening database: ", err)
	}

	// Kiểm tra kết nối với database
	err = postgresDB.Ping()
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	} else {
		log.Println("Connected to the database successfully!")
	}

	return postgresDB, nil
}
