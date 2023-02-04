package handler

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo-contrib/session"
	_"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/shion0625/portfolio-creater/backend/infrastructure"
	_ "github.com/shion0625/portfolio-creater/backend/config/dataloader"
	"github.com/shion0625/portfolio-creater/backend/graphql/generated"
	"github.com/shion0625/portfolio-creater/backend/graphql/resolver"
	"github.com/shion0625/portfolio-creater/backend/graphql/directives"
)

func Welcome() echo.HandlerFunc {
	return func(c echo.Context) error {
		session, _ := session.Get("session", c)
		fmt.Println(session)
		return c.String(http.StatusOK, "Welcome!")
	}
}

func Playground() echo.HandlerFunc {
	return func(c echo.Context) error {
		playgroundHandler := playground.Handler("GraphQL playground", "/api/query")
		playgroundHandler.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}

func QueryPlayground(r *resolver.Resolver) echo.HandlerFunc {
	return func(c echo.Context) error {
		// db := infrastructure.ConnectGORM()
		// userLoader := dataloader.UsersByIDs(db)
		// workLoader := dataloader.WorksByIDs(db)
		gc := generated.Config{Resolvers: r}
		gc.Directives.Auth = directives.Auth
		// gc.Directives.HasRole = func(ctx context.Context, obj interface{}, next graphql.Resolver, role []model.Role) (interface{}, error) {
		// 	// session, err := session.Get("session", c)
		// 	// if err!=nil {
		// 	//     return nil, c.String(http.StatusInternalServerError, "Error")
		// 	// }
		// 	// //ログインしているか
		// 	// if b, _:=session.Values["auth"];b!=true{
		// 	//     return nil, c.String(http.StatusUnauthorized, "401")
		// 	// }else {
		// 	// 	if !directives.HasRole(session.Values["role"].(string), role) {
		// 	// 		return nil, fmt.Errorf("Access denied")
		// 	// 	}
		// 	// 	return next(ctx)
		// 	// }
		// 	return next(ctx)
		// }
		graphqlHandler := handler.NewDefaultServer(
			generated.NewExecutableSchema(
				gc,
			),
		)
		graphqlHandler.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}
