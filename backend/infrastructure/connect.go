package infrastructure

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type SQLHandler struct {
	Conn *gorm.DB
}

func NewSQLHandler() *gorm.DB {
	dsn := os.Getenv("DATABASE_URL")
	conn, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}
	return conn
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
