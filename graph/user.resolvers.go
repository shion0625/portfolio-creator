package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph/model"
)

// Works is the resolver for the works field.
func (r *userResolver) Works(ctx context.Context, obj *model.User) (*model.WorkPagination, error) {
	works,err :=r.WorkLoader.Load(obj.ID)
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

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
