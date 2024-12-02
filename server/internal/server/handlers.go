package server

import (
	authHttp "go-package/internal/auth/delivery/http"
	productsHttp "go-package/internal/products/delivery/http"

	authRepo "go-package/internal/auth/repository"
	productsRepo "go-package/internal/products/repository"

	authUC "go-package/internal/auth/usecase"
	productsUC "go-package/internal/products/usecase"

	"go-package/internal/middleware"

	"github.com/gin-gonic/gin"
)

func (s *Server) MapHandler(r *gin.Engine) error {
	authRepo := authRepo.NewAuthRepository(s.db)
	productsRepo := productsRepo.NewProductsRepository(s.db)

	authUC := authUC.NewAuthUseCase(authRepo)
	productsUC := productsUC.NewProductsUseCase(productsRepo)

	middlewareManager := middleware.NewMiddlewareManager(authUC, productsUC)
	authHandlers := authHttp.NewAuthHandler(authUC)
	productsHandlers := productsHttp.NewProductsHandlers(productsUC)

	v1 := r.Group("/api/v1")
	authGroup := v1.Group("/auth")
	// userGroup := v1.Group("/user")
	productsGroup := v1.Group("/products")
	// cartGroup := v1.Group("/cart")
	// ordersGroup := v1.Group("/orders")
	// paymentGroup := v1.Group("/payment")
	// adminGroup := v1.Group("/admin")

	authHttp.AuthRoutes(authGroup, authHandlers, middlewareManager)
	productsHttp.ProductsRoutes(productsGroup, productsHandlers, middlewareManager)

	return nil
}
