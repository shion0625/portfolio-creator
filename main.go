package main

import (
	"log"
	"net/http"
	"github.com/jinzhu/gorm"
	"github.com/jinzhu/gorm/dialects/postgres"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	//データベースへの接続
	_, err != gorm.Open(
		"postgres",
		fmt.Sprintf(
			"host%s"
		)
	)


	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", welcome())

	err := e.Start(":8080")
	if err != nil {
		log.Fatalln(err)
	}
}

func welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome!")
	}
}
