package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"errors"
	"fmt"

	"github.com/shion0625/portfolio-creator/backend/domain"
	"github.com/shion0625/portfolio-creator/backend/graphql/generated"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

// UserAuth is the resolver for the userAuth field.
func (r *queryResolver) UserAuth(ctx context.Context, id string) (*domain.User, error) {
	user, err := r.userUseCase.GetByID(ctx, id)

	if !errors.Is(err, nil) {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, &gqlerror.Error{
				Message: "user id not found",
			}
		}

		return nil, fmt.Errorf("UserAuth - queryResolver: %w", err)
	}

	return user, nil
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*domain.User, error) {
	user, err := r.userUseCase.GetByID(ctx, id)
	if !errors.Is(err, nil) {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, &gqlerror.Error{
				Message: "user id not found",
			}
		}

		return nil, fmt.Errorf("User - queryResolver: %w", err)
	}

	return user, nil
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context, limit int, offset *int) (*domain.UserPagination, error) {
	userPagination, err := r.userUseCase.GetAll(ctx, limit, *offset)
	if !errors.Is(err, nil) {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, &gqlerror.Error{
				Message: "users not found",
			}
		}

		return nil, fmt.Errorf("Users - queryResolver: %w", err)
	}

	return userPagination, nil
}

// Work is the resolver for the work field.
func (r *queryResolver) Work(ctx context.Context, id string) (*domain.Work, error) {
	work, err := r.workUseCase.GetByID(ctx, id)
	if !errors.Is(err, nil) {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, &gqlerror.Error{
				Message: "work id not found",
			}
		}

		return nil, fmt.Errorf("Work - queryResolver: %w", err)
	}

	return work, nil
}

// Works is the resolver for the works field.
func (r *queryResolver) Works(ctx context.Context, limit int, order string, searched string, num int) (*domain.WorkPagination, error) {
	workPagination, err := r.workUseCase.GetAll(ctx, limit, order, searched, num)
	if !errors.Is(err, nil) {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, &gqlerror.Error{
				Message: "works not found",
			}
		}

		return nil, fmt.Errorf("Works - queryResolver: %w", err)
	}

	return workPagination, nil
}

// WorkNodes is the resolver for the workNodes field.
func (r *queryResolver) WorkNodes(ctx context.Context, limit int, order string, searched string, num int) ([]*domain.Work, error) {
	workNodes, err := r.workUseCase.GetAllNodes(ctx, limit, order, searched, num)
	if !errors.Is(err, nil) {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, &gqlerror.Error{
				Message: "works not found",
			}
		}

		return nil, fmt.Errorf("Works - queryResolver: %w", err)
	}

	return workNodes, nil
}

// Search is the resolver for the search field.
func (r *queryResolver) Search(ctx context.Context, target string, keyword string, limit int, searched string, num int) (domain.ModelPagination, error) {
	var result domain.ModelPagination

	var err error

	switch target {
	case "user":
		result, err = r.userUseCase.Search(ctx, keyword, limit, searched, num)
		if !errors.Is(err, nil) {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, &gqlerror.Error{
					Message: "works not found",
				}
			}

			return result, nil
		}
	case "work":
		result, err = r.workUseCase.Search(ctx, keyword, limit, searched, num)
		if !errors.Is(err, nil) {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				return nil, &gqlerror.Error{
					Message: "works not found",
				}
			}

			return result, nil
		}
	default:
		return nil, &gqlerror.Error{
			Message: "target1 not found",
		}
	}

	return result, nil
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
