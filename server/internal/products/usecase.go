package products

import (
	"context"
	"go-package/internal/models"

	"github.com/google/uuid"
)

type UseCase interface {
	GetProducts(ctx context.Context) ([]*models.Product, error)
	GetProductByID(ctx context.Context, productID uuid.UUID) (*models.Product, error)
	CreateProduct(ctx context.Context, product *models.Product) error
	UpdateProduct(ctx context.Context, product *models.Product) error
	DeleteProduct(ctx context.Context, productID uuid.UUID) error
}
