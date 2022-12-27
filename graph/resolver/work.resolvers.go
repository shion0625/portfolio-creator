package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph/model"
)

// CreatedAt is the resolver for the created_at field.
func (r *workResolver) CreatedAt(ctx context.Context, obj *model.Work) (string, error) {
	panic(fmt.Errorf("not implemented: CreatedAt - created_at"))
}

// UpdatedAt is the resolver for the updated_at field.
func (r *workResolver) UpdatedAt(ctx context.Context, obj *model.Work) (string, error) {
	panic(fmt.Errorf("not implemented: UpdatedAt - updated_at"))
}

// IsDelete is the resolver for the is_delete field.
func (r *workResolver) IsDelete(ctx context.Context, obj *model.Work) (bool, error) {
	panic(fmt.Errorf("not implemented: IsDelete - is_delete"))
}

// User is the resolver for the user field.
func (r *workResolver) User(ctx context.Context, obj *model.Work) (*model.User, error) {
	user, err := r.UserLoader.Load(obj.UserID)
	return user, err
}

// Work returns generated.WorkResolver implementation.
func (r *Resolver) Work() generated.WorkResolver { return &workResolver{r} }

type workResolver struct{ *Resolver }
