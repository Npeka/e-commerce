package http

import (
	"go-package/internal/auth"
	"go-package/internal/models"
	"go-package/pkg/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type authHandler struct {
	authUseCase auth.UseCase
}

func NewAuthHandler(authUseCase auth.UseCase) *authHandler {
	return &authHandler{authUseCase: authUseCase}
}

func (h *authHandler) SignUp() gin.HandlerFunc {
	return func(c *gin.Context) {
		user := models.User{}
		if err := utils.ValidateRequest(c, &user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid request body",
			})
			return
		}

		tokenResponse, err := h.authUseCase.SignUp(c, &user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message":       "Sign up success",
			"access_token":  tokenResponse.AccessToken,
			"refresh_token": tokenResponse.RefreshToken,
		})
	}
}

func (h *authHandler) SignIn() gin.HandlerFunc {
	return func(c *gin.Context) {
		user := models.User{}
		if err := utils.ValidateRequest(c, &user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid request body",
			})
			return
		}

		tokenResponse, err := h.authUseCase.SignIn(c, &user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message":       "Sign in success",
			"access_token":  tokenResponse.AccessToken,
			"refresh_token": tokenResponse.RefreshToken,
		})
	}
}

func (h *authHandler) SignOut() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, exists := c.Get("user")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		err := h.authUseCase.SignOut(c, uuid.MustParse(claims.(*utils.Claims).Id))
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
	}
}

func (h *authHandler) ForgotPassword() gin.HandlerFunc {
	return func(c *gin.Context) {
		user := models.User{}
		if err := utils.ValidateRequest(c, &user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid request body",
			})
			return
		}

		err := h.authUseCase.ForgotPassword(c, &user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Email has been sent",
		})
	}
}

func (h *authHandler) ResetPassword() gin.HandlerFunc {
	return func(c *gin.Context) {
		type ResetPassword struct {
			Password      string `json:"password" validate:"required"`
			ConfirmPasswd string `json:"confirm_password" validate:"required,eqfield=Password"`
		}

		reset := ResetPassword{}
		if err := utils.ValidateRequest(c, &reset); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid request body",
			})
			return
		}

		token := c.Query("token")
		claims, err := utils.ValidateJWTToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		err = h.authUseCase.ResetPassword(c, token, &models.User{
			ID:       uuid.MustParse(claims.ID),
			Email:    claims.Email,
			Password: reset.Password,
		})
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Reset password success",
		})
	}
}

func (h *authHandler) RefreshToken() gin.HandlerFunc {
	return func(c *gin.Context) {

	}
}

func (h *authHandler) GetProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, exists := c.Get("user")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		user, err := h.authUseCase.GetProfile(c, uuid.MustParse(claims.(*utils.Claims).Id))
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"user": user,
		})
	}
}

func (h *authHandler) UpdateProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		const dateFormat = "2006-01-02"
		type UpdateUser struct {
			FullName   string             `json:"full_name"`
			Email      string             `json:"email"`
			Gender     *models.UserGender `json:"gender"`
			DayOfBirth *string            `json:"date_of_birth"`
		}

		user := UpdateUser{}
		if err := utils.ValidateRequest(c, &user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid request body",
			})
			return
		}

		var dob *time.Time
		if user.DayOfBirth != nil {
			parsedDob, err := time.Parse(dateFormat, *user.DayOfBirth)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Invalid date format, expected yyyy-mm-dd",
				})
				return
			}
			dob = &parsedDob
		}

		claims, exists := c.Get("user")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		u := models.User{
			ID:         uuid.MustParse(claims.(*utils.Claims).Id),
			FullName:   user.FullName,
			Email:      user.Email,
			Gender:     user.Gender,
			DayOfBirth: dob,
		}
		err := h.authUseCase.UpdateProfile(c, &u)
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Update profile success",
		})
	}
}
