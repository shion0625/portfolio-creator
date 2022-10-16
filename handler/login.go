package handler

import (
	"net/http"
	"time"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo-contrib/session"
	"github.com/gorilla/sessions"
	"github.com/shion0625/my-portfolio-backend/middleware"
	"github.com/shion0625/my-portfolio-backend/db"
	"github.com/shion0625/my-portfolio-backend/graph/model"
	"github.com/dgrijalva/jwt-go"
)

func Login(e *echo.Echo) echo.HandlerFunc{
    e.Use(session.Middleware(sessions.NewCookieStore([]byte("secret"))))
    return func(c echo.Context) error {
			username := c.FormValue("username")
			password := c.FormValue("password")
			db := db.ConnectGORM()
			user := [] model.User{}
			db.Find(&user, "name=? and password=?", username, password)
			if len(user) > 0 && username == user[0].Name {

				middleware.LoginSession(c, user)
				// トークンの作成
				token := jwt.New(jwt.SigningMethodHS256)
				// Set claims
				claims := token.Claims.(jwt.MapClaims)
				claims["name"] = username
				claims["admin"] = true
				claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

				// Generate encoded token and send it as response.
				t, _ := token.SignedString([]byte("secret"))
				return c.JSON(http.StatusOK, map[string]string{
					"token": t,
				})
			}
			return echo.ErrUnauthorized
    }
}


func Logout() echo.HandlerFunc{
    return func(c echo.Context) error {
			middleware.LogoutSession(c)
			return c.NoContent(http.StatusOK)
    }
}
