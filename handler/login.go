package handler

import (
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/shion0625/my-portfolio-backend/db"
	"github.com/shion0625/my-portfolio-backend/graph/model"
	"github.com/shion0625/my-portfolio-backend/middlewares"
)

func Login(e *echo.Echo) echo.HandlerFunc {
	e.Use(session.Middleware(sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))))
	return func(c echo.Context) error {
		username := c.FormValue("username")
		password := c.FormValue("password")
		db := db.ConnectGORM()
		user := []model.User{}
		db.Find(&user, "name=? and password=?", username, password)
		if len(user) > 0 && username == user[0].Name {

			middlewares.LoginSession(c, user)
			// トークンの作成
			token := jwt.New(jwt.SigningMethodHS256)
			// Set claims
			claims := token.Claims.(jwt.MapClaims)
			claims["name"] = username
			claims["admin"] = true
			claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

			// Generate encoded token and send it as response.
			t, _ := token.SignedString([]byte(os.Getenv("TOKEN_KEY")))
			return c.JSON(http.StatusOK, map[string]string{
				"token": t,
			})
		}
		return echo.ErrUnauthorized
	}
}

func Logout() echo.HandlerFunc {
	return func(c echo.Context) error {
		middlewares.LogoutSession(c)
		return c.NoContent(http.StatusOK)
	}
}
