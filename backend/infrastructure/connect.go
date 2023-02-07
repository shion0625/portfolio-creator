package infrastructure

import (
	"errors"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type SQLHandler struct {
	Conn *gorm.DB
}

func NewSQLHandler() *SQLHandler {
	dsn := os.Getenv("DATABASE_URL")
	conn, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if errors.Is(err,nil) {
		panic(err.Error())
	}

	sqlHandler := new(SQLHandler)
	sqlHandler.Conn = conn

	return sqlHandler
}

// func ConnectDB() *gorm.DB {
// 	//データベースへの接続
// 	dsn := os.Getenv("DATABASE_URL")
// 	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	return db
// }
