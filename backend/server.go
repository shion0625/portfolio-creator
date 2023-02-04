package main

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/shion0625/portfolio-creater/backend/config/dig"
	"github.com/shion0625/portfolio-creater/backend/graphql/resolver"
	// "github.com/shion0625/portfolio-creater/backend/infrastructure"
	"github.com/shion0625/portfolio-creater/backend/config/jwt"
	"github.com/shion0625/portfolio-creater/backend/graphql/directives"
	"github.com/shion0625/portfolio-creater/backend/graphql/generated"
	"github.com/shion0625/portfolio-creater/backend/util"
)

func main() {
	util.LoadEnv()
	// db := infrastructure.ConnectDB()

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// cors設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	c, _ := dig.BuildDigDependencies()
	err := c.Invoke(func(r *resolver.Resolver) error {

		e.GET("/", Playground())
		g := e.Group("/api")
		g.Use(echo.WrapMiddleware(jwt.AuthMiddleware))
		g.POST("/query", QueryPlayground(r))
		return nil
	})

	if err != nil {
		panic(err)
	}

	port := util.GetPort()
	errPort := e.Start(port)
	if errPort == nil {
		log.Fatalln(errPort)
	}

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
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
		// db := infrastructure.ConnectDB()
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

// go run github.com/vektah/dataloaden UserLoader string *github.com/shion0625/portfolio-creater/backend/graph/model.User

// go run github.com/vektah/dataloaden WorkLoader string []*github.com/shion0625/portfolio-creater/backend/graph/model.Work
