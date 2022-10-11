package db

import (
	"fmt"
	"os"
	"gorm.io/driver/postgres"
  "gorm.io/gorm"
	"github.com/joho/godotenv"
)

func ConnectGORM() *gorm.DB {
	loadEnv()
	//データベースへの接続
	dsn := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
    panic(err.Error())
	}
	return db
}

// ここで.envファイル全体を読み込みます。
// この読み込み処理がないと、個々の環境変数が取得出来ません。
func loadEnv() {
	// 読み込めなかったら err にエラーが入ります。
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf("読み込み出来ませんでした: %v", err)
	}
}
