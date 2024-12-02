package models

import "time"

type Conversation struct {
	ID       string     `json:"id"`
	BuyerID  string     `json:"buyer_id"`
	ShopId   string     `json:"shop_id"`
	CreateAt *time.Time `json:"create_at"`
}

type Message struct {
	ID             string     `json:"id"`
	ConversationID string     `json:"conversation_id"`
	SenderID       string     `json:"sender_id"`
	Message        string     `json:"message"`
	IsSeen         bool       `json:"is_read"`
	CreatedAt      *time.Time `json:"sent_at"`
}
