package products

import "github.com/gin-gonic/gin"

type Handlers interface {
	GetProducts() gin.HandlerFunc
	GetProductByID() gin.HandlerFunc
	CreateProduct() gin.HandlerFunc
	UpdateProduct() gin.HandlerFunc
	DeleteProduct() gin.HandlerFunc
}
