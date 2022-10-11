package main

import (
	"os"
	"log"
	"fmt"
	"github.com/shion0625/my-portfolio-backend/handler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/joho/godotenv"
)


func main() {
	loadEnv()
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", handler.Welcome())
	e.GET("/playground", handler.Playground())
	e.POST("/login", handler.Login())
	e.POST("/query", handler.QueryPlayground())

	r := e.Group("restricted")
	r.Use(middleware.JWT([]byte("secret")))
	r.POST("", handler.Restricted())

	port := os.Getenv("PORT")
	errPort := e.Start(port)
	if errPort == nil {
		log.Fatalln(errPort)
	}
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
