package handler

import (
	"context"
	"fmt"
	"net/http"
	"time"
	"github.com/labstack/echo/v4"
	"github.com/dgrijalva/jwt-go"
		"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/shion0625/my-portfolio-backend/db"
	"github.com/shion0625/my-portfolio-backend/graph/model"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph"
	"github.com/shion0625/my-portfolio-backend/graph/directives"
  "github.com/labstack/echo-contrib/session"
)

func Welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		session, _ := session.Get("session_agent", c)
		content := session.Values["foo"]
		fmt.Println(content)
		return c.String(http.StatusOK, "Welcome!")
	}
}

func Playground() echo.HandlerFunc {
	return func (c echo.Context) error {
			playgroundHandler := playground.Handler("GraphQL playground", "/api/query")
			playgroundHandler.ServeHTTP(c.Response(), c.Request())
			return nil
		}
}

func QueryPlayground() echo.HandlerFunc {
		db := db.ConnectGORM()
		c:=generated.Config{Resolvers: &graph.Resolver{DB: db}}
			c.Directives.HasRole = func(ctx context.Context, obj interface{}, next graphql.Resolver, role []model.Role) (interface{}, error) {
				token, _ := directives.GetToken(ctx)
				if !directives.HasRole(token, role) {
					return nil, fmt.Errorf("Access denied")
				}
				return next(ctx)
			}
		graphqlHandler := handler.NewDefaultServer(
		generated.NewExecutableSchema(
			c,
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

func SetRole(ctx context.Context, is_admin bool) context.Context{
	if is_admin {
		return directives.SetToken(ctx, "ADMIN")
	}
	return directives.SetToken(ctx, "USER")
}
// func Restricted() echo.HandlerFunc  {
//   return func(c echo.Context) error {
// 		db := db.ConnectGORM()
//     user := c.Get("user").(*jwt.Token)
// 		_ = user.Claims.(jwt.MapClaims)
// 		bufBody := new(bytes.Buffer)
//     bufBody.ReadFrom(c.Request().Body)
// 		query := bufBody.String()
//     log.Printf(query)
//     result := &graph.Resolver{DB: db}
//     // claims := user.Claims.(jwt.MapClaims)
//     // name := claims["name"].(string)
//     return c.String(http.StatusOK, result)
//   }
// }
