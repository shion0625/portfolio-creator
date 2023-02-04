package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/portfolio-creater/backend/domain"
	"github.com/shion0625/portfolio-creater/backend/graphql/generated"
)

// Works is the resolver for the works field.
func (r *userResolver) Works(ctx context.Context, obj *domain.User) (*domain.WorkPagination, error) {
	works, err := r.WorkLoader.Load(obj.ID)
	pageInfo := domain.PaginationInfo{
		Page:             1,
		PaginationLength: 1,
		HasNextPage:      false,
		HasPreviousPage:  false,
		Count:            len(works),
		TotalCount:       len(works),
	}
	pagination := domain.WorkPagination{
		PageInfo: &pageInfo,
		Nodes:    works,
	}
	return &pagination, err
}

// Profile is the resolver for the profile field.
func (r *userResolver) Profile(ctx context.Context, obj *domain.User) (*domain.Profile, error) {
	panic(fmt.Errorf("not implemented: Profile - profile"))
}

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
