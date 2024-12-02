package utils

import (
	"github.com/gin-gonic/gin"
)

func ValidateRequest(c *gin.Context, s interface{}) error {
	if err := c.BindJSON(s); err != nil {
		return err
	}
	return validate.StructCtx(c.Request.Context(), s)
}
