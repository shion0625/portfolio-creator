package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"math"
	"gorm.io/gorm"
	"github.com/shion0625/portfolio-creater/backend/graph/generated"
	"github.com/shion0625/portfolio-creater/backend/graph/model"
	"github.com/shion0625/portfolio-creater/backend/service"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// UserAuth is the resolver for the userAuth field.
func (r *queryResolver) UserAuth(ctx context.Context, id string) (*model.User, error) {
	user, err := service.UserGetByID(ctx, r.DB, id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "user id not found",
			}
		}
		return nil, err
	}

	return user, nil
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	user, err := service.UserGetByID(ctx, r.DB, id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "user id not found",
			}
		}
		return nil, err
	}

	return user, nil
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context, limit int, offset *int) (*model.UserPagination, error) {
	totalCount, err := service.UserTotalCountGet(ctx, r.DB)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "userTotalCount not found",
			}
		}
		return nil, err
	}

	users, numRows,err := service.UsersGet(ctx, r.DB, limit, *offset)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "users not found",
			}
		}
		return nil, err
	}

	pageInfo := model.PaginationInfo{
		Page:             int(math.Ceil(float64(*offset) / float64(limit))),
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      int(totalCount) < (limit + *offset),
		HasPreviousPage:  (limit < *offset),
		Count:            int(numRows),
		TotalCount:       int(totalCount),
	}
	pagination := model.UserPagination{
		PageInfo: &pageInfo,
		Nodes:    users,
	}
	return &pagination, nil
}

// Work is the resolver for the work field.
func (r *queryResolver) Work(ctx context.Context, id string) (*model.Work, error) {
	work, err := service.WorkGetByID(ctx, r.DB, id)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "work id not found",
			}
		}
		return nil, err
	}
	return work, nil
}

// Works is the resolver for the works field.
func (r *queryResolver) Works(ctx context.Context, limit int, offset *int) (*model.WorkPagination, error) {
	totalCount, err := service.WorkTotalCountGet(ctx, r.DB)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "work totalCount not found",
			}
		}
		return nil, err
	}

works, numRows,err := service.WorksGet(ctx, r.DB, limit, *offset)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "works not found",
			}
		}
		return nil, err
	}

	pageInfo := model.PaginationInfo{
		Page:             int(math.Ceil(float64(*offset) / float64(limit))),
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      (int(totalCount) < limit+*offset),
		HasPreviousPage:  limit < *offset,
		Count:            int(numRows),
		TotalCount:       int(totalCount),
	}
	pagination := model.WorkPagination{
		PageInfo: &pageInfo,
		Nodes:    works,
	}
	return &pagination, nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
