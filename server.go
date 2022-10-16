package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/shion0625/my-portfolio-backend/handler"
		"github.com/labstack/echo-contrib/session"
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

	e.GET("/playground", handler.Playground())
	e.POST("/login", handler.Login(e))
	e.GET("/session", handler.Logout())
	e.GET("/secret", secret())

	// r := e.Group("/api")
	// r.Use(middleware.JWT([]byte("secret")))
	// r.POST("/query", handler.QueryPlayground())
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

func secret() echo.HandlerFunc{
    return func(c echo.Context)error{
        //sessionを見る
        session, err := session.Get("session", c)
        if err!=nil {
            return c.String(http.StatusInternalServerError, "Error")
        }
					fmt.Println(session)
        //ログインしているか
        if b, _:=session.Values["auth"];b!=true{
            return c.String(http.StatusUnauthorized, "401")
        }else {
            return c.String(http.StatusOK, session.Values["role"].(string))
        }
    }
}
