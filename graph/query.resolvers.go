package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"math"
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
var totalCount int64
	hasNextPage := true
	hasPreviousPage := true

	users := []*model.User{}
	r.DB.Model(&model.User{}).Count(&totalCount)
	result := r.DB.Debug().Limit(limit).Offset(*offset).Find(&users)
	if limit < *offset {
		hasPreviousPage = false
	}
	if int(totalCount) < limit + *offset {
		hasNextPage = false
	}

	pageInfo := model.PaginationInfo{
		Page:             int(math.Ceil(float64(*offset) / float64(limit))),
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      hasNextPage,
		HasPreviousPage:  hasPreviousPage,
		Count:            int(result.RowsAffected),
		TotalCount:       int(totalCount),
	}
	pagination := model.UserPagination{
		PageInfo: &pageInfo,
		Nodes:    users,
	}
	return &pagination, result.Error
}

// Work is the resolver for the work field.
func (r *queryResolver) Work(ctx context.Context, id string) (*model.Work, error) {
	work := model.Work{ID: id}
	r.DB.First(&work)
	return &work, nil
}

// Works is the resolver for the works field.
func (r *queryResolver) Works(ctx context.Context, limit int, offset *int) (*model.WorkPagination, error) {
	var totalCount int64
	hasNextPage := true
	hasPreviousPage := true

	works := []*model.Work{}
	r.DB.Model(&model.Work{}).Count(&totalCount)
	result := r.DB.Debug().Limit(limit).Offset(*offset).Find(&works)
	if limit < *offset {
		hasPreviousPage = false
	}
	if int(totalCount) < limit + *offset {
		hasNextPage = false
	}
	// if int(result.RowsAffected) == 0 {
	// 	result.Error = "データが見つかりませんでした。"
	// }

	pageInfo := model.PaginationInfo{
		Page:             int(math.Ceil(float64(*offset) / float64(limit))),
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      hasNextPage,
		HasPreviousPage:  hasPreviousPage,
		Count:            int(result.RowsAffected),
		TotalCount:       int(totalCount),
	}
	pagination := model.WorkPagination{
		PageInfo: &pageInfo,
		Nodes:    works,
	}
	return &pagination, result.Error
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
