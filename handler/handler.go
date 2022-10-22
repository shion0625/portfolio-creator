package handler

import (
	"context"
	"fmt"
	"net/http"
	"time"
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
		workLoader := dataloader.NewWorkLoader(dataloader.WorkLoaderConfig{
			MaxBatch: 100, // 溜める最大数、0を指定すると制限無し
			Wait:     2 * time.Millisecond, // 溜める時間
			Fetch: func(keys []string) ([][]*model.Work, []error) {
				works := make([][]*model.Work, len(keys))
				errors := make([]error, len(keys))
				fmt.Println(works)

				// 取得処理を書く SELECT * FROM company WHERE company_id IN (...)

				// 引数のkeysに対応する順番の配列で返す。
				return works, errors
			},
    })

		userLoader := dataloader.NewUserLoader(dataloader.UserLoaderConfig{
			MaxBatch: 100, // 溜める最大数、0を指定すると制限無し
			Wait:     2 * time.Millisecond, // 溜める時間
			Fetch: func(keys []string) ([]*model.User, []error) {
				users := make([]*model.User, len(keys))
				errors := make([]error, len(keys))

				for i, key := range keys {
					users[i] = &model.User{ID: key, Name: "user " + key}
				}
				// 引数のkeysに対応する順番の配列で返す。
				return users, errors
			},
    })

		db := db.ConnectGORM()
		gc:=generated.Config{Resolvers: &graph.Resolver{
			DB: db,
			WorkLoader: workLoader,
			UserLoader: userLoader,
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
