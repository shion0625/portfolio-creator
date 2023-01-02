package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/portfolio-creater/backend/graph/generated"
	"github.com/shion0625/portfolio-creater/backend/graph/model"
)

// Works is the resolver for the works field.
func (r *userResolver) Works(ctx context.Context, obj *model.User) (*model.WorkPagination, error) {
	works, err := r.WorkLoader.Load(obj.ID)
	pageInfo := model.PaginationInfo{
		Page:             1,
		PaginationLength: 1,
		HasNextPage:      false,
		HasPreviousPage:  false,
		Count:            len(works),
		TotalCount:       len(works),
	}
	pagination := model.WorkPagination{
		PageInfo: &pageInfo,
		Nodes:    works,
	}
	return &pagination, err
}

// Profile is the resolver for the profile field.
func (r *userResolver) Profile(ctx context.Context, obj *model.User) (*model.Profile, error) {
	panic(fmt.Errorf("not implemented: Profile - profile"))
}

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *userResolver) EmailVerified(ctx context.Context, obj *model.User) ([]*string, error) {
	panic(fmt.Errorf("not implemented: EmailVerified - emailVerified"))
}
