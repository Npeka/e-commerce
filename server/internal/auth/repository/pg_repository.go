package repository

import (
	"context"
	"go-package/internal/models"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/pkg/errors"
)

type authRepository struct {
	db *sqlx.DB
}

func NewAuthRepository(db *sqlx.DB) *authRepository {
	return &authRepository{db}
}

func (r *authRepository) CreateUser(ctx context.Context, user *models.User) (*models.User, error) {
	u := &models.User{}
	if err := r.db.QueryRowxContext(ctx, createUserQuery,
		user.FullName,
		user.Email,
		user.Password,
		user.Role,
	).StructScan(u); err != nil {
		return nil, errors.Wrap(err, "authRepository.CreateUser.StructScan")
	}

	return u, nil
}

func (r *authRepository) UpdateUser(ctx context.Context, user *models.User) error {
	_, err := r.db.ExecContext(ctx, updateUserQuery,
		user.FullName,
		user.Email,
		user.Gender,
		user.DayOfBirth,
		user.ID,
	)
	if err != nil {
		return err
	}
	return nil
}

func (r *authRepository) UpdatePassword(ctx context.Context, user *models.User) error {
	_, err := r.db.ExecContext(ctx, updatePasswordQuery, user.Password, user.ID)
	if err != nil {
		return err
	}
	return nil
}

func (r *authRepository) FindByID(ctx context.Context, userID uuid.UUID) (*models.User, error) {
	foundUser := &models.User{}
	err := r.db.QueryRowxContext(ctx, findByIDQuery, userID).StructScan(foundUser)
	if err != nil {
		return nil, errors.Wrap(err, "authRepository.FindById.StructScan")
	}
	return foundUser, nil
}

func (r *authRepository) FindByEmail(ctx context.Context, user *models.User) (*models.User, error) {
	foundUser := &models.User{}
	err := r.db.QueryRowxContext(ctx, findByEmailQuery, user.Email).StructScan(foundUser)
	if err != nil {
		return nil, errors.Wrap(err, "authRepository.FindByEmail.StructScan")
	}
	return foundUser, nil
}

func (r *authRepository) UpdateRefreshToken(ctx context.Context, refreshToken string, user *models.User) error {
	_, err := r.db.ExecContext(ctx, updateRefreshTokenQuery, refreshToken, user.ID)
	if err != nil {
		return err
	}
	return nil
}

func (r *authRepository) UpdatePasswordResetToken(ctx context.Context, token string, user *models.User) error {
	_, err := r.db.ExecContext(ctx, updatePasswordResetTokenQuery, token, user.ID)
	if err != nil {
		return err
	}
	return nil
}

func (r *authRepository) GetPasswordResetToken(ctx context.Context, user *models.User) (*models.User, error) {
	foundUser := &models.User{}
	err := r.db.QueryRowxContext(ctx, getPasswordResetTokenQuery, user.ID).StructScan(foundUser)
	if err != nil {
		return nil, errors.Wrap(err, "authRepository.GetPasswordResetToken.StructScan")
	}
	return foundUser, nil
}

func (r *authRepository) DeleteRefreshToken(ctx context.Context, userID uuid.UUID) error {
	_, err := r.db.ExecContext(ctx, deleteRefreshTokenQuery, userID)
	if err != nil {
		return err
	}
	return nil
}
