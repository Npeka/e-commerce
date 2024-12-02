package auth

import (
	"context"
	"go-package/internal/models"

	"github.com/google/uuid"
)

type UseCase interface {
	SignUp(ctx context.Context, user *models.User) (*models.TokenResponse, error)
	SignIn(ctx context.Context, user *models.User) (*models.TokenResponse, error)
	SignOut(ctx context.Context, userID uuid.UUID) error
	ForgotPassword(ctx context.Context, user *models.User) error
	ResetPassword(ctx context.Context, token string, user *models.User) error
	RefreshToken(ctx context.Context) error
	GetProfile(ctx context.Context, userID uuid.UUID) (*models.User, error)
	UpdateProfile(ctx context.Context, user *models.User) error
}
