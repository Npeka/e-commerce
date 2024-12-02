package http

import (
	"go-package/internal/middleware"
	"go-package/internal/products"

	"github.com/gin-gonic/gin"
)

func ProductsRoutes(ProductsGroup *gin.RouterGroup, h products.Handlers, mw *middleware.MiddlewareManager) {
	ProductsGroup.GET("/", h.GetProducts())
	ProductsGroup.GET("/:product_id", h.GetProductByID())

	//
	ProductsGroup.POST("/", h.CreateProduct())
	ProductsGroup.PATCH("/:product_id", h.UpdateProduct())
	ProductsGroup.DELETE("/:product_id", h.DeleteProduct())
}
