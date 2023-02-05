package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/portfolio-creator/backend/domain"
	"github.com/shion0625/portfolio-creator/backend/graphql/generated"
)

// Works is the resolver for the works field.
func (r *userResolver) Works(ctx context.Context, obj *domain.User) (*domain.WorkPagination, error) {
	worksPagination, err := r.workUseCase.GetAllLoad(ctx, obj.ID)
	return worksPagination, err
}

// Profile is the resolver for the profile field.
func (r *userResolver) Profile(ctx context.Context, obj *domain.User) (*domain.Profile, error) {
	panic(fmt.Errorf("not implemented: Profile - profile"))
}

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
