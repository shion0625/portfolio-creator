package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph/model"
)

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	user := model.User{ID: id}
	r.DB.First(&user)
	return &user, nil
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context, limit int, offset *int) (*model.UserPagination, error) {
	panic(fmt.Errorf("not implemented: Users - users"))
}

// Work is the resolver for the work field.
func (r *queryResolver) Work(ctx context.Context, id string) (*model.Work, error) {
	panic(fmt.Errorf("not implemented: Work - work"))
}

// Works is the resolver for the works field.
func (r *queryResolver) Works(ctx context.Context, limit int, offset *int) (*model.WorkPagination, error) {
	panic(fmt.Errorf("not implemented: Works - works"))
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
