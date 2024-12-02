package models

import (
	"html"
	"strings"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type UserRole int

const (
	USER UserRole = iota
	ADMIN
)

type UserGender string

const (
	MALE   UserGender = "male"
	FEMALE UserGender = "female"
	OTHER  UserGender = "other"
)

type User struct {
	ID                 uuid.UUID   `json:"id" db:"id"`
	FullName           string      `json:"full_name,omitempty" db:"full_name" validate:"omitempty"`
	Email              string      `json:"email,omitempty" db:"email" validate:"omitempty,email,required"`
	Password           string      `json:"password,omitempty" db:"password" validate:"omitempty,required"`
	Gender             *UserGender `json:"gender,omitempty" db:"gender" validate:"omitempty"`
	DayOfBirth         *time.Time  `json:"day_of_birth,omitempty" db:"date_of_birth" validate:"omitempty"`
	Role               UserRole    `json:"role,omitempty" db:"role" validate:"omitempty"`
	RefreshToken       *string     `json:"refresh_token,omitempty" db:"refresh_token" validate:"omitempty"`
	PasswordResetToken *string     `json:"password_reset_token,omitempty" db:"password_reset_token" validate:"omitempty"`
	CreatedAt          *time.Time  `json:"created_at,omitempty" db:"created_at"`
	UpdatedAt          *time.Time  `json:"updated_at,omitempty" db:"updated_at"`
}

type CustomTime time.Time

const customDateFormat = "2006-01-02"

func (c *CustomTime) UnmarshalJSON(b []byte) error {
	str := string(b)
	t, err := time.Parse(`"`+customDateFormat+`"`, str)
	if err != nil {
		return err
	}
	*c = CustomTime(t)
	return nil
}

func (u *User) HashPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 14)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func (u *User) VerifyPassword(password string) error {
	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)); err != nil {
		return err
	}
	return nil
}

func (u *User) PrepareCreate() error {
	u.FullName = Santize(u.FullName)
	u.Email = Santize(strings.ToLower(u.Email))
	u.Password = Santize(u.Password)
	u.Role = USER

	if err := u.HashPassword(); err != nil {
		return err
	}
	return nil
}

func (u *User) PrepareUpdate() error {
	u.FullName = Santize(u.FullName)
	u.Email = Santize(strings.ToLower(u.Email))
	return nil
}

func Santize(data string) string {
	return html.EscapeString(strings.TrimSpace(data))
}

// All Users response
type UsersList struct {
	TotalCount int     `json:"total_count"`
	TotalPages int     `json:"total_pages"`
	Page       int     `json:"page"`
	Size       int     `json:"size"`
	HasMore    bool    `json:"has_more"`
	Users      []*User `json:"users"`
}

// Find user query
type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}
