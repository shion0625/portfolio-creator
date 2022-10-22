package handler

import (
	"context"
	"fmt"
	"net/http"
	"github.com/labstack/echo/v4"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/shion0625/my-portfolio-backend/db"
	"github.com/shion0625/my-portfolio-backend/graph/model"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph"
	_"github.com/shion0625/my-portfolio-backend/graph/directives"
	"github.com/labstack/echo-contrib/session"
	"github.com/shion0625/my-portfolio-backend/dataloader"
)

func Welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		session, _ := session.Get("session", c)
		fmt.Println(session)
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
	return func(c echo.Context) error {
		db := db.ConnectGORM()
		userLoader := dataloader.UsersByIDs(db)
		workLoader := dataloader.WorksByIDs(db)
		gc:=generated.Config{Resolvers: &graph.Resolver{
			DB: db,
			UserLoader: userLoader,
			WorkLoader: workLoader,
		}}
			gc.Directives.HasRole = func(ctx context.Context, obj interface{}, next graphql.Resolver, role []model.Role) (interface{}, error) {
				// session, err := session.Get("session", c)
				// if err!=nil {
        //     return nil, c.String(http.StatusInternalServerError, "Error")
        // }
				// //ログインしているか
        // if b, _:=session.Values["auth"];b!=true{
        //     return nil, c.String(http.StatusUnauthorized, "401")
        // }else {
				// 	if !directives.HasRole(session.Values["role"].(string), role) {
				// 		return nil, fmt.Errorf("Access denied")
				// 	}
				// 	return next(ctx)
				// }
				return next(ctx)
			}
		graphqlHandler := handler.NewDefaultServer(
		generated.NewExecutableSchema(
			gc,
		),
	)
		graphqlHandler.ServeHTTP(c.Response(), c.Request())
		return nil
	}
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