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

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.UpdateUser) (*model.User, error) {
	panic(fmt.Errorf("not implemented: UpdateUser - updateUser"))
}

// UpdateWork is the resolver for the updateWork field.
func (r *mutationResolver) UpdateWork(ctx context.Context, input model.UpdateWork) (*model.Work, error) {
	panic(fmt.Errorf("not implemented: UpdateWork - updateWork"))
}

// DeleteWork is the resolver for the deleteWork field.
func (r *mutationResolver) DeleteWork(ctx context.Context, input model.DeleteWork) (*bool, error) {
	panic(fmt.Errorf("not implemented: DeleteWork - deleteWork"))
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

// Work is the resolver for the work field.
func (r *queryResolver) Work(ctx context.Context) (*model.Work, error) {
	panic(fmt.Errorf("not implemented: Work - work"))
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context) (*model.User, error) {
	panic(fmt.Errorf("not implemented: User - user"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
