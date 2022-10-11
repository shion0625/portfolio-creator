package handler

import (
	"fmt"
	"net/http"
	"github.com/labstack/echo"
	"github.com/dgrijalva/jwt-go"
	"github.com/shion0625/my-portfolio-backend/db"
	"github.com/shion0625/my-portfolio-backend/graph/model"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph"
	"github.com/99designs/gqlgen/graphql/playground"
  "time"
)

func Welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.String(http.StatusOK, "Welcome!")
	}
}

func Playground() echo.HandlerFunc {
	return func (c echo.Context) error {
			playgroundHandler := playground.Handler("GraphQL playground", "/query")
			playgroundHandler.ServeHTTP(c.Response(), c.Request())
			return nil
		}
}

func QueryPlayground() echo.HandlerFunc {
		db := db.ConnectGORM()
		graphqlHandler := handler.NewDefaultServer(
		generated.NewExecutableSchema(
			generated.Config{Resolvers: &graph.Resolver{DB: db}},
		),
	)
	return func(c echo.Context) error {
		graphqlHandler.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}

func Login() echo.HandlerFunc {
	return func(c echo.Context) error {
		username := c.FormValue("username")
		password := c.FormValue("password")
		db := db.ConnectGORM()
		user := [] model.User{}
		db.Find(&user, "name=? and password=?", username, password)
		if len(user) > 0 && username == user[0].Name {
      // Create token
			token := jwt.New(jwt.SigningMethodHS256)

			// Set claims
			claims := token.Claims.(jwt.MapClaims)
			claims["name"] = username
			claims["admin"] = true
			claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
			fmt.Println(claims)

			// Generate encoded token and send it as response.
      t, err := token.SignedString([]byte("secret"))
			println(t)

      if err != nil {
				fmt.Println(err)
        return err
      }

    return c.JSON(http.StatusOK, map[string]string{
			"token": t,
    })
		}
		return echo.ErrUnauthorized
	}
}

func Restricted() echo.HandlerFunc  {
  return func(c echo.Context) error {
    user := c.Get("user").(*jwt.Token)
    claims := user.Claims.(jwt.MapClaims)
    name := claims["name"].(string)
    return c.String(http.StatusOK, "Welcome "+name+"!")
  }
}
