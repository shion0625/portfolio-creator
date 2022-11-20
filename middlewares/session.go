package middlewares

import (
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/shion0625/my-portfolio-backend/graph/model"
	"net/http"
)

func LoginSession(c echo.Context, user []model.User) error {
	// sessionの作成
	session, _ := session.Get("session", c)
	session.Options = &sessions.Options{
		MaxAge:   86400 * 7,
		HttpOnly: true,
	}
	session.Values["auth"] = true
	// if user[0].IsAdmin {
	// 	session.Values["role"] = "ADMIN"
	// } else {
	// 	session.Values["role"] = "USER"
	// }
	//状態保存
	if err := session.Save(c.Request(), c.Response()); err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusOK)
}

func LogoutSession(c echo.Context) error {
	session, _ := session.Get("session", c)
	session.Values["auth"] = false
	//状態を保存
	if err := session.Save(c.Request(), c.Response()); err != nil {
		return c.NoContent(http.StatusInternalServerError)
	}
	return c.NoContent(http.StatusOK)
}
