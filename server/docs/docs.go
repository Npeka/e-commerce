// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/auth/signin": {
            "post": {
                "description": "Sign in",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Sign in",
                "parameters": [
                    {
                        "description": "User data for authentication",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.User"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.TokenResponse"
                        }
                    }
                }
            }
        },
        "/auth/signup": {
            "post": {
                "description": "Sign up",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Sign up",
                "parameters": [
                    {
                        "description": "User data for authentication",
                        "name": "user",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.User"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.TokenResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "models.TokenResponse": {
            "type": "object",
            "properties": {
                "access_token": {
                    "type": "string"
                },
                "refresh_token": {
                    "type": "string"
                }
            }
        },
        "models.User": {
            "type": "object",
            "required": [
                "email",
                "password"
            ],
            "properties": {
                "created_at": {
                    "type": "string"
                },
                "day_of_birth": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "gender": {
                    "$ref": "#/definitions/models.UserGender"
                },
                "id": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "password_reset_token": {
                    "type": "string"
                },
                "refresh_token": {
                    "type": "string"
                },
                "role": {
                    "$ref": "#/definitions/models.UserRole"
                },
                "updated_at": {
                    "type": "string"
                }
            }
        },
        "models.UserGender": {
            "type": "string",
            "enum": [
                "male",
                "female",
                "other"
            ],
            "x-enum-varnames": [
                "MALE",
                "FEMALE",
                "OTHER"
            ]
        },
        "models.UserRole": {
            "type": "integer",
            "enum": [
                0,
                1
            ],
            "x-enum-varnames": [
                "USER",
                "ADMIN"
            ]
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
