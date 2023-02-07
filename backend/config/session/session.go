package session

import (
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/shion0625/portfolio-creator/backend/domain"
)

func LoginSession(c echo.Context, user []domain.User) error {
	var maxAge = 86400 * 7
	// sessionの作成
	session, _ := session.Get("session", c)
	session.Options = &sessions.Options{
		MaxAge:   maxAge,
		HttpOnly: true,
	}
	session.Values["auth"] = true
	// if user[0].IsAdmin {
	// 	session.Values["role"] = "ADMIN"
	// } else {
	// 	session.Values["role"] = "USER"
	// }

	if err := session.Save(c.Request(), c.Response()); err != nil {
		return fmt.Errorf("%w", c.JSON(http.StatusInternalServerError, "session save error"))
	}

	return nil
}

func LogoutSession(c echo.Context) error {
	session, _ := session.Get("session", c)
	session.Values["auth"] = false

	if err := session.Save(c.Request(), c.Response()); err != nil {
		return fmt.Errorf("%w", c.JSON(http.StatusInternalServerError, "auth session save error"))
	}

	return nil
}
