package repository

import (
	"context"
	"go-package/internal/models"
	"log"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type ProductsRepository struct {
	db *sqlx.DB
}

func NewProductsRepository(db *sqlx.DB) *ProductsRepository {
	return &ProductsRepository{db}
}

func (r *ProductsRepository) GetProducts(ctx context.Context) ([]*models.Product, error) {
	ps := []*models.Product{}
	err := r.db.SelectContext(ctx, &ps, getProductsQuery)
	if err != nil {
		return nil, err
	}
	return ps, nil
}

func (r *ProductsRepository) GetProductByID(ctx context.Context, productId uuid.UUID) (*models.Product, error) {
	p := &models.Product{}
	err := r.db.QueryRowxContext(ctx, getProductByIdQuery, productId).StructScan(p)
	if err != nil {
		return nil, err
	}
	return p, nil
}

func (r *ProductsRepository) CreateProduct(ctx context.Context, product *models.Product) error {
	if err := r.db.QueryRowContext(ctx, createProductQuery,
		product.Name,
		product.Price,
		product.Description,
	).Scan(&product.ID); err != nil {
		return err
	}
	return nil
}

func (r *ProductsRepository) UpdateProduct(ctx context.Context, product *models.Product) error {
	log.Println("product", product)
	_, err := r.db.ExecContext(ctx, updateProductQuery,
		product.Name,
		product.Price,
		product.Description,
		product.ID,
	)
	if err != nil {
		return err
	}
	return nil
}

func (r *ProductsRepository) DeleteProduct(ctx context.Context, productID uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, deleteProductQuery, productID)
	if err != nil {
		return err
	}
	return nil
}
