package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/portfolio-creater/backend/domain"
	"github.com/shion0625/portfolio-creater/backend/graphql/generated"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

// UpdateProfile is the resolver for the updateProfile field.
func (r *mutationResolver) UpdateProfile(ctx context.Context, input domain.UpdateProfileInput) (*domain.User, error) {
	panic(fmt.Errorf("not implemented: UpdateProfile - updateProfile"))
}

// CreateWork is the resolver for the createWork field.
func (r *mutationResolver) CreateWork(ctx context.Context, input domain.CreateWorkInput) (bool, error) {
	err := r.workUseCase.Create(ctx, input)
	if err != nil {
		return false, err
	}
	return true, nil
}

// UpdateWork is the resolver for the updateWork field.
func (r *mutationResolver) UpdateWork(ctx context.Context, input domain.UpdateWorkInput) (bool, error) {
	work, err := r.workUseCase.GetByID(ctx, input.ID)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, &gqlerror.Error{
				Message: "work not found",
			}
		}
		return false, err
	}
	if input.Title == nil {
		input.Title = &work.Title
	}
	err = r.workUseCase.Update(ctx, work, input)
	if err != nil {
		return false, err
	}

	return true, nil
}

// DeleteWorks is the resolver for the deleteWorks field.
func (r *mutationResolver) DeleteWorks(ctx context.Context, ids []*string) (bool, error) {
	err := r.workUseCase.Delete(ctx, ids)
	if err != nil {
		return false, err
	}
	return true, nil
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, id string, email string) (interface{}, error) {
	token, err := r.userUseCase.Login(ctx, id, email)
	if err != nil {
		return nil, err
	}
	return token, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
