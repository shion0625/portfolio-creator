package util

import (
	"fmt"

	"github.com/joho/godotenv"
)

// ここで.envファイル全体を読み込みます。
// この読み込み処理がないと、個々の環境変数が取得出来ません。
func LoadEnv() {
	// 読み込めなかったら err にエラーが入ります。
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf("読み込み出来ませんでした: %v", err)
	}
}
