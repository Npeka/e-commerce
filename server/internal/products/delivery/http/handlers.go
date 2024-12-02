package http

import (
	"go-package/internal/models"
	"go-package/internal/products"
	"go-package/pkg/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ProductsHandlers struct {
	productsUC products.UseCase
}

func NewProductsHandlers(productsUC products.UseCase) *ProductsHandlers {
	return &ProductsHandlers{
		productsUC: productsUC,
	}
}

func (h *ProductsHandlers) GetProducts() gin.HandlerFunc {
	return func(c *gin.Context) {
		products, err := h.productsUC.GetProducts(c.Request.Context())
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": products,
		})
	}
}

func (h *ProductsHandlers) GetProductByID() gin.HandlerFunc {
	return func(c *gin.Context) {
		productId, err := uuid.Parse(c.Param("product_id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid product id",
			})
			return
		}

		product, err := h.productsUC.GetProductByID(c.Request.Context(), productId)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": product,
		})
	}
}

func (h *ProductsHandlers) CreateProduct() gin.HandlerFunc {
	return func(c *gin.Context) {
		product := &models.Product{}
		if err := utils.ValidateRequest(c, product); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err.Error(),
			})
			return
		}

		if err := h.productsUC.CreateProduct(c.Request.Context(), product); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "Create product successfully",
		})
	}
}

func (h *ProductsHandlers) UpdateProduct() gin.HandlerFunc {
	return func(c *gin.Context) {
		productId, err := uuid.Parse(c.Param("product_id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid product ID",
			})
			return
		}

		product := &models.Product{
			ID: productId,
		}
		if err := utils.ValidateRequest(c, product); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err.Error(),
			})
			return
		}

		if err := h.productsUC.UpdateProduct(c.Request.Context(), product); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Update product by ID",
		})
	}
}

func (h *ProductsHandlers) DeleteProduct() gin.HandlerFunc {
	return func(c *gin.Context) {
		productId, err := uuid.Parse(c.Param("product_id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid product ID",
			})
			return
		}

		if err := h.productsUC.DeleteProduct(c.Request.Context(), productId); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Delete product by ID",
		})
	}
}
