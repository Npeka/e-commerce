package http

import (
	"go-package/internal/auth"
	"go-package/internal/middleware"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(authGroup *gin.RouterGroup, h auth.Handlers, mw *middleware.MiddlewareManager) {
	authGroup.POST("/sign-up", h.SignUp())
	authGroup.POST("/sign-in", h.SignIn())
	authGroup.POST("/sign-out", h.SignOut())
	authGroup.POST("/forgot-password", h.ForgotPassword())
	authGroup.POST("/reset-password", h.ResetPassword())
	// authGroup.POST("/refresh-token", h.RefreshToken())

	authGroup.Use(mw.AuthMiddleware())
	authGroup.GET("/profile", h.GetProfile())
	authGroup.PATCH("/profile", h.UpdateProfile())
}
