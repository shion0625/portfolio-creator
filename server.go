package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"github.com/joho/godotenv"
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/shion0625/my-portfolio-backend/graph"
	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)


func main() {
	loadEnv()
	//データベースへの接続
	dsn := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	graphqlHandler := handler.NewDefaultServer(
		generated.NewExecutableSchema(
			generated.Config{Resolvers: &graph.Resolver{DB: db}},
		),
	)
	e.POST("/query", func(c echo.Context) error {
		graphqlHandler.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	e.GET("/", welcome())
	e.GET("/playground", pagePlayground)

	port := os.Getenv("PORT")
	errPort := e.Start(port)
	if errPort == nil {
		log.Fatalln(errPort)
	}
}

func welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome!")
	}
}

func loadEnv() {
	// ここで.envファイル全体を読み込みます。
	// この読み込み処理がないと、個々の環境変数が取得出来ません。
	// 読み込めなかったら err にエラーが入ります。
	err := godotenv.Load(".env")

	// もし err がnilではないなら、"読み込み出来ませんでした"が出力されます。
	if err != nil {
		fmt.Printf("読み込み出来ませんでした: %v", err)
	}
}

func pagePlayground(c echo.Context) error {
	playgroundHandler := playground.Handler("GraphQL playground", "/query")
	playgroundHandler.ServeHTTP(c.Response(), c.Request())
	return nil
}
