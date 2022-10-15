package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
  "github.com/gorilla/sessions"
  "github.com/labstack/echo-contrib/session"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/shion0625/my-portfolio-backend/handler"
	"github.com/shion0625/my-portfolio-backend/mymiddleware"
)


func main() {
	loadEnv()
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// cors対策
  e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"http://localhost:3000"},
        AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
    }))
	// sessionの使用
	e.Use(session.Middleware(sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))))
	e.GET("/", mymiddleware.SessionHandler())

	e.GET("/playground", handler.Playground())
	e.POST("/login", handler.Login())

	r := e.Group("/api")
	// r.Use(middleware.JWT([]byte("secret")))
	r.POST("/query", handler.QueryPlayground())
	e.GET("/welcome", handler.Welcome())

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
