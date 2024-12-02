package middleware

import (
	"go-package/internal/auth"
	"go-package/internal/products"
)

type MiddlewareManager struct {
	authUC     auth.UseCase
	productsUC products.UseCase
}

func NewMiddlewareManager(authUC auth.UseCase, productsUC products.UseCase) *MiddlewareManager {
	return &MiddlewareManager{
		authUC:     authUC,
		productsUC: productsUC,
	}
}
