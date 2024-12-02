package models

import "github.com/google/uuid"

type Status string

const (
	PENDING    Status = "pending"
	PROCESSING Status = "processing"
	COMPLETED  Status = "completed"
	CANCELLED  Status = "cancelled"
)

type Order struct {
	ID         uuid.UUID `json:"id" db:"id"`
	UserID     uuid.UUID `json:"user_id,omitempty" db:"user_id" validate:"omitempty"`
	TotalPrice float64   `json:"total_price,omitempty" db:"total_price" validate:"omitempty"`
	Status     Status    `json:"status,omitempty" db:"status" validate:"omitempty"`
	PaymentID  string    `json:"payment_id,omitempty" db:"payment_id" validate:"omitempty"`
	CreatedAt  string    `json:"created_at,omitempty" db:"created_at"`
	UpdatedAt  string    `json:"updated_at,omitempty" db:"updated_at"`
}

type OrderItem struct {
	ID        uuid.UUID `json:"id" db:"id"`
	OrderID   uuid.UUID `json:"order_id,omitempty" db:"order_id" validate:"omitempty"`
	ProductID uuid.UUID `json:"product_id,omitempty" db:"product_id" validate:"omitempty"`
	Quantity  int       `json:"quantity,omitempty" db:"quantity" validate:"omitempty"`
	Price     float64   `json:"price,omitempty" db:"price" validate:"omitempty"`
	CreatedAt string    `json:"created_at,omitempty" db:"created_at"`
	UpdatedAt string    `json:"updated_at,omitempty" db:"updated_at"`
}
