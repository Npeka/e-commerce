package auth

import (
	"context"
	"go-package/internal/models"

	"github.com/google/uuid"
)

type Repository interface {
	CreateUser(ctx context.Context, user *models.User) (*models.User, error)
	UpdateUser(ctx context.Context, user *models.User) error
	UpdatePassword(ctx context.Context, user *models.User) error
	FindByID(ctx context.Context, userID uuid.UUID) (*models.User, error)
	FindByEmail(ctx context.Context, user *models.User) (*models.User, error)
	UpdateRefreshToken(ctx context.Context, refreshToken string, user *models.User) error
	UpdatePasswordResetToken(ctx context.Context, token string, user *models.User) error
	GetPasswordResetToken(ctx context.Context, user *models.User) (*models.User, error)
	DeleteRefreshToken(ctx context.Context, userID uuid.UUID) error
}
