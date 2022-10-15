package mymiddleware

import (
	"github.com/labstack/echo/v4"
  "github.com/labstack/echo-contrib/session"
  "github.com/gorilla/sessions"
	"net/http"
)

func SessionHandler() echo.HandlerFunc {
	return func (c echo.Context) error {
		session, _ := session.Get("session_agent", c)
		session.Options = &sessions.Options{
			Path:     "/",
			MaxAge:   86400 * 7,
			HttpOnly: true,
		}
		session.Values["foo"] = "bar"
		err := session.Save(c.Request(), c.Response())
		if err != nil {
				return err
			}
		return c.NoContent(http.StatusOK)
	}
}
