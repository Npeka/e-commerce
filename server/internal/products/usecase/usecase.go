package usecase

import (
	"context"
	"go-package/internal/models"
	"go-package/internal/products"

	"github.com/google/uuid"
)

type ProductsUseCase struct {
	productRepo products.Repository
}

func NewProductsUseCase(productRepo products.Repository) *ProductsUseCase {
	return &ProductsUseCase{
		productRepo: productRepo,
	}
}

func (u *ProductsUseCase) GetProducts(ctx context.Context) ([]*models.Product, error) {
	products, err := u.productRepo.GetProducts(ctx)
	if err != nil {
		return nil, err
	}
	return products, nil
}

func (u *ProductsUseCase) GetProductByID(ctx context.Context, productId uuid.UUID) (*models.Product, error) {
	product, err := u.productRepo.GetProductByID(ctx, productId)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (u *ProductsUseCase) CreateProduct(ctx context.Context, product *models.Product) error {
	if err := u.productRepo.CreateProduct(ctx, product); err != nil {
		return err
	}
	return nil
}

func (u *ProductsUseCase) UpdateProduct(ctx context.Context, product *models.Product) error {
	if err := u.productRepo.UpdateProduct(ctx, product); err != nil {
		return err
	}
	return nil
}

func (u *ProductsUseCase) DeleteProduct(ctx context.Context, productID uuid.UUID) error {
	if err := u.productRepo.DeleteProduct(ctx, productID); err != nil {
		return err
	}
	return nil
}
