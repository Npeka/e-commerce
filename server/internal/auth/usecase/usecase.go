package usecase

import (
	"context"

	"go-package/internal/auth"
	"go-package/internal/models"
	"go-package/pkg/utils"

	"github.com/google/uuid"
	"github.com/pkg/errors"
)

type AuthClaims struct {
	UserID    string `json:"user_id"`
	UserEmail string `json:"user_email"`
}

type authUseCase struct {
	authRepo auth.Repository
}

func NewAuthUseCase(authRepo auth.Repository) auth.UseCase {
	return &authUseCase{
		authRepo: authRepo,
	}
}

func (a *authUseCase) SignUp(ctx context.Context, user *models.User) (*models.TokenResponse, error) {
	existsUser, err := a.authRepo.FindByEmail(ctx, user)
	if existsUser != nil || err == nil {
		return nil, errors.Wrap(err, "email")
	}

	if err := user.PrepareCreate(); err != nil {
		return nil, err
	}

	createdUser, err := a.authRepo.CreateUser(ctx, user)
	if err != nil {
		return nil, err
	}

	accessToken, err := utils.CreateJWTToken(createdUser)
	if err != nil {
		return nil, err
	}

	refreshToken, err := utils.CreateRefreshToken(createdUser)
	if err != nil {
		return nil, err
	}

	if err := a.authRepo.UpdateRefreshToken(ctx, refreshToken, createdUser); err != nil {
		return nil, err
	}

	return &models.TokenResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (a *authUseCase) SignIn(ctx context.Context, user *models.User) (*models.TokenResponse, error) {
	foundUser, err := a.authRepo.FindByEmail(ctx, user)
	if foundUser == nil || err != nil {
		return nil, errors.New("user not found")
	}

	if err := foundUser.VerifyPassword(user.Password); err != nil {
		return nil, errors.New("invalid password")
	}

	accessToken, err := utils.CreateJWTToken(foundUser)
	if err != nil {
		return nil, err
	}

	refreshToken, err := utils.CreateRefreshToken(foundUser)
	if err != nil {
		return nil, err
	}

	if err := a.authRepo.UpdateRefreshToken(ctx, refreshToken, foundUser); err != nil {
		return nil, err
	}

	return &models.TokenResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (a *authUseCase) SignOut(ctx context.Context, userID uuid.UUID) error {
	if err := a.authRepo.DeleteRefreshToken(ctx, userID); err != nil {
		return err
	}
	return nil
}

func (a *authUseCase) ForgotPassword(ctx context.Context, user *models.User) error {
	foundUser, err := a.authRepo.FindByEmail(ctx, user)
	if foundUser == nil || err != nil {
		return errors.New("user not found")
	}

	token, err := utils.CreatePasswordResetToken(foundUser)
	if err != nil {
		return err
	}

	resetUrl := "http://localhost:3000/reset-password?token=" + token
	err = utils.SendEmailResetPassword(foundUser.Email, resetUrl)
	if err != nil {
		return err
	}

	if err := a.authRepo.UpdatePasswordResetToken(ctx, token, foundUser); err != nil {
		return err
	}

	return nil
}

func (a *authUseCase) ResetPassword(ctx context.Context, token string, user *models.User) error {
	foundUser, err := a.authRepo.GetPasswordResetToken(ctx, user)
	if foundUser == nil || err != nil {
		return errors.New("user not found")
	}

	if foundUser.PasswordResetToken != nil && *foundUser.PasswordResetToken != token {
		return errors.New("invalid token")
	}

	user.HashPassword()
	a.authRepo.UpdatePassword(ctx, user)
	return nil
}

func (a *authUseCase) RefreshToken(ctx context.Context) error {
	panic("implement me")

}

func (a *authUseCase) GetProfile(ctx context.Context, userID uuid.UUID) (*models.User, error) {
	user, err := a.authRepo.FindByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (a *authUseCase) UpdateProfile(ctx context.Context, user *models.User) error {
	if err := user.PrepareUpdate(); err != nil {
		return err
	}
	if err := a.authRepo.UpdateUser(ctx, user); err != nil {
		return err
	}
	return nil
}
