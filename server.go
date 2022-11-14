package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/shion0625/my-portfolio-backend/middlewares"
	"github.com/shion0625/my-portfolio-backend/handler"
	"log"
	"net/http"
	"os"
)

func main() {
	loadEnv()
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// cors設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
    AllowCredentials: true,
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	e.GET("/", handler.Playground())
	e.POST("/login", handler.Login(e))
	e.GET("/logout", handler.Logout())

	g := e.Group("/api")
	g.Use(echo.WrapMiddleware(middlewares.AuthMiddleware))
	g.POST("/query", handler.QueryPlayground())

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

// go run github.com/vektah/dataloaden UserLoader string *github.com/shion0625/my-portfolio-backend/graph/model.User

// go run github.com/vektah/dataloaden WorkLoader string []*github.com/shion0625/my-portfolio-backend/graph/model.Work
