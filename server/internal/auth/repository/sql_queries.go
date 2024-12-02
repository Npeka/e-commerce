package repository

const (
	createUserQuery = `
		INSERT INTO users (full_name, email, password, role) 
		VALUES ($1, $2, $3, $4)
		RETURNING id`

	updateUserQuery = `
		UPDATE users SET full_name = $1, email = $2, gender = $3, date_of_birth = $4, updated_at = CURRENT_TIMESTAMP
		WHERE id = $5`

	deleteUserQuery = `
		DELETE FROM users
		WHERE id = $1`

	updatePasswordQuery = `
		UPDATE users SET password = $1, password_reset_token = NULL, updated_at = CURRENT_TIMESTAMP
		WHERE id = $2`

	findByIDQuery = `
		SELECT id, full_name, email, gender, date_of_birth
		FROM users
		WHERE id = $1`

	findByEmailQuery = `
		SELECT id, full_name, email, password, gender, date_of_birth
		FROM users 
		WHERE email = $1`

	updateRefreshTokenQuery = `
		UPDATE users SET refresh_token = $1, updated_at = CURRENT_TIMESTAMP
		WHERE id = $2`

	updatePasswordResetTokenQuery = `
		UPDATE users SET password_reset_token = $1, updated_at = CURRENT_TIMESTAMP
		WHERE id = $2`

	getPasswordResetTokenQuery = `
		SELECT password_reset_token
		FROM users
		WHERE id = $1`

	deleteRefreshTokenQuery = `
		UPDATE users SET refresh_token = NULL, updated_at = CURRENT_TIMESTAMP
		WHERE id = $1`
)
