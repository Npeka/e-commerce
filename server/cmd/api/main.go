package main

import (
	"go-package/internal/server"
	"go-package/pkg/db/postgres"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"go.uber.org/zap"
)

func main() {
	// Logger
	logger, _ := zap.NewDevelopment()
	defer logger.Sync()

	// rootPath, _ := filepath.Abs("../../.env")
	// err := godotenv.Load(rootPath)
	err := godotenv.Load("../../.env")
	if err != nil {
		logger.Fatal("LoadEnv:", zap.Error(err))
	}

	// Postgres Database
	postgresDB, err := postgres.NewPostgreDB()
	if err != nil {
		logger.Fatal("Postgre init failed:", zap.Error(err))
	} else {
		logger.Info("Postgre init success")
	}
	defer postgresDB.Close()

	// Server
	s := server.NewServer(postgresDB)
	if err := s.Run(); err != nil {
		logger.Fatal("Server run failed:", zap.Error(err))
	}
}
