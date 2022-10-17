package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph/model"
)

// Works is the resolver for the works field.
func (r *userResolver) Works(ctx context.Context, obj *model.User) (*model.WorkPagination, error) {
	// work, err := r.WorkLoader.Load("123")
	panic(fmt.Errorf("not implemented: Works - works"))
}

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
