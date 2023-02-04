package directives

import (
	"context"
	"github.com/99designs/gqlgen/graphql"
	"github.com/shion0625/portfolio-creater/backend/config/jwt"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
	tokenData := jwt.CtxValue(ctx)
	if tokenData == nil {
		return nil, &gqlerror.Error{
			Message: "Access Denied",
		}
	}

	return next(ctx)
}
