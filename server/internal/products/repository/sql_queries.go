package repository

const (
	getProductsQuery = `
		SELECT *
		FROM products`

	getProductByIdQuery = `
		SELECT *
		FROM products
		WHERE id = $1`

	createProductQuery = `
		INSERT INTO products (name, price, description)
		VALUES ($1, $2, $3)
		RETURNING id`

	updateProductQuery = `
		UPDATE products 
		SET name = $1, price = $2, description = $3, updated_at = CURRENT_TIMESTAMP
		WHERE id = $4`

	deleteProductQuery = `
		DELETE FROM products
		WHERE id = $1`
)
