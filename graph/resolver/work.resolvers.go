package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph/model"
)

// User is the resolver for the user field.
func (r *workResolver) User(ctx context.Context, obj *model.Work) (*model.User, error) {
	user, err := r.UserLoader.Load(obj.UserID)
	return user, err
}

// Work returns generated.WorkResolver implementation.
func (r *Resolver) Work() generated.WorkResolver { return &workResolver{r} }

type workResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *workResolver) CreatedAt(ctx context.Context, obj *model.Work) (string, error) {
	panic(fmt.Errorf("not implemented: CreatedAt - created_at"))
}
func (r *workResolver) UpdatedAt(ctx context.Context, obj *model.Work) (string, error) {
	panic(fmt.Errorf("not implemented: UpdatedAt - updated_at"))
}
func (r *workResolver) IsDelete(ctx context.Context, obj *model.Work) (bool, error) {
	panic(fmt.Errorf("not implemented: IsDelete - is_delete"))
}
