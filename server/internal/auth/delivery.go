package auth

import "github.com/gin-gonic/gin"

type Handlers interface {
	SignUp() gin.HandlerFunc
	SignIn() gin.HandlerFunc
	SignOut() gin.HandlerFunc
	ForgotPassword() gin.HandlerFunc
	ResetPassword() gin.HandlerFunc
	RefreshToken() gin.HandlerFunc
	GetProfile() gin.HandlerFunc
	UpdateProfile() gin.HandlerFunc
}
