package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph/model"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	user := model.User{
		IsAdmin:  input.IsAdmin,
		Name:     input.Name,
		Password: input.Password,
		Email:    input.Email,
		IsAble:   input.IsAble,
	}
	r.DB.Create(&user)
	return &user, nil
}

// CreateWork is the resolver for the createWork field.
func (r *mutationResolver) CreateWork(ctx context.Context, input model.NewWork) (*model.Work, error) {
	panic(fmt.Errorf("not implemented: CreateWork - createWork"))
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	users := []*model.User{}
	r.DB.Find(&users)
	return users, nil
}

// Works is the resolver for the works field.
func (r *queryResolver) Works(ctx context.Context) ([]*model.Work, error) {
	panic(fmt.Errorf("not implemented: Works - works"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
