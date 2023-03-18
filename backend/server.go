package main

import (
	"errors"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/shion0625/portfolio-creator/backend/config/auth"
	"github.com/shion0625/portfolio-creator/backend/config/dig"
	"github.com/shion0625/portfolio-creator/backend/graphql/directives"
	"github.com/shion0625/portfolio-creator/backend/graphql/generated"
	"github.com/shion0625/portfolio-creator/backend/graphql/resolver"
	"github.com/shion0625/portfolio-creator/backend/util"
)

var timeout = 30 * time.Second

func main() {
	util.LoadEnv()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// cors設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		AllowOrigins: []string{
			os.Getenv("FRONTEND_URL"),
			os.Getenv("FRONTEND_URL"),
			os.Getenv("FRONTEND_DEVELOP_URL"),
		},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPut,
			http.MethodPost,
			http.MethodDelete,
		},
	}))

	d, _ := dig.BuildDigDependencies()
	err := d.Invoke(func(r *resolver.Resolver) error {
		e.GET("/", Playground())
		g := e.Group("/api")
		g.Use(echo.WrapMiddleware(auth.AuthMiddleware))
		g.POST("/query", QueryPlayground(r))

		return nil
	})

	if !errors.Is(err, nil) {
		panic(err)
	}

	port := util.GetPort()
	errPort := e.Start(":" + port)

	if !errors.Is(errPort, nil) {
		log.Fatalln(errPort)
	}

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)

	server := &http.Server{
		Addr:              ":" + port,
		ReadHeaderTimeout: timeout,
	}

	log.Fatal(server.ListenAndServe())
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
