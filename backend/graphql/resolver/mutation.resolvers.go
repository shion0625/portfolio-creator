package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/portfolio-creater/backend/domain"
	"github.com/shion0625/portfolio-creater/backend/graphql/generated"
	"github.com/shion0625/portfolio-creater/backend/service"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

// UpdateProfile is the resolver for the updateProfile field.
func (r *mutationResolver) UpdateProfile(ctx context.Context, input domain.UpdateProfileInput) (*domain.User, error) {
	panic(fmt.Errorf("not implemented: UpdateProfile - updateProfile"))
}

// CreateWork is the resolver for the createWork field.
func (r *mutationResolver) CreateWork(ctx context.Context, input domain.CreateWorkInput) (*domain.Work, error) {
	work, err := service.WorkCreate(ctx, r.DB, input)
	if err != nil {
		return nil, err
	}
	return work, nil
}

// UpdateWork is the resolver for the updateWork field.
func (r *mutationResolver) UpdateWork(ctx context.Context, input domain.UpdateWorkInput) (*domain.Work, error) {
	work, err := service.WorkGetByID(ctx, r.DB, input.ID)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "work not found",
			}
		}
		return nil, err
	}
	if input.Title == nil {
		input.Title = &work.Title
	}
	updatedWork, err := service.WorkUpdate(ctx, r.DB, work, input)
	if err != nil {
		return nil, err
	}

	return updatedWork, nil
}

// DeleteWorks is the resolver for the deleteWorks field.
func (r *mutationResolver) DeleteWorks(ctx context.Context, ids []*string) (bool, error) {
	_, err := service.WorksDelete(ctx, r.DB, ids)
	if err != nil {
		return false, err
	}
	return true, nil
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, id string, email string) (interface{}, error) {
	return service.UserLogin(ctx, id, email)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
