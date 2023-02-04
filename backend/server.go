package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/shion0625/portfolio-creater/backend/config/dig"
	"github.com/shion0625/portfolio-creater/backend/graphql/resolver"
	"github.com/shion0625/portfolio-creater/backend/handler"
	"github.com/shion0625/portfolio-creater/backend/infrastructure"
	"github.com/shion0625/portfolio-creater/backend/middlewares"
)

func main() {
	loadEnv()
	db := infrastructure.ConnectDB()

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// cors設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	c, _ := dig.BuildDigDependencies(db)
	err := c.Invoke(func(r *resolver.Resolver) error {

		e.GET("/", handler.Playground())
		g := e.Group("/api")
		g.Use(echo.WrapMiddleware(middlewares.AuthMiddleware))
		g.POST("/query", handler.QueryPlayground(r))
		return nil
	})

	if err != nil {
		panic(err)
	}

	port := getPort()
	errPort := e.Start(port)
	if errPort == nil {
		log.Fatalln(errPort)
	}

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
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

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return port
}

// go run github.com/vektah/dataloaden UserLoader string *github.com/shion0625/portfolio-creater/backend/graph/model.User

// go run github.com/vektah/dataloaden WorkLoader string []*github.com/shion0625/portfolio-creater/backend/graph/model.Work
