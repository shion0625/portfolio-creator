package main

import (
	// "fmt"
	"log"
	"net/http"

  "gorm.io/driver/postgres"
  "gorm.io/gorm"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	//データベースへの接続
	dsn := "host=db user=shion0625 password=Xshion0912 dbname=portfolio port=5432 sslmode=disable TimeZone=Asia/Tokyo"
	_, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}


	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/", welcome())

	error := e.Start(":8080")
	if error != nil {
		log.Fatalln(error)
	}
}

func welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(http.StatusOK, "tom!")
	}
}
