package directives

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"github.com/shion0625/portfolio-creator/backend/config/auth"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
	_, isExist := auth.CtxValue(ctx)
	if !isExist {
		return nil, &gqlerror.Error{
			Message: "Access Denied",
		}
	}

	return next(ctx)
}
