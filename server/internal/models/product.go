package models

import "github.com/google/uuid"

type Product struct {
	ID          uuid.UUID `json:"id" db:"id"`
	Name        string    `json:"name,omitempty" db:"name" validate:"omitempty"`
	ShopID      uuid.UUID `json:"shop_id,omitempty" db:"shop_id" validate:"omitempty"`
	Price       int       `json:"price,omitempty" db:"price" validate:"omitempty"`
	Description string    `json:"description,omitempty" db:"description" validate:"omitempty"`
	Status      string    `json:"status,omitempty" db:"status" validate:"omitempty"`
	Images      string    `json:"images,omitempty" db:"images" validate:"omitempty"`
	CategoryID  uuid.UUID `json:"category_id,omitempty" db:"category_id" validate:"omitempty"`
	CreatedAt   string    `json:"created_at,omitempty" db:"created_at" validate:"omitempty"`
	UpdatedAt   string    `json:"updated_at,omitempty" db:"updated_at" validate:"omitempty"`
}
