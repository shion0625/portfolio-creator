package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph/model"
)

// User is the resolver for the user field.
func (r *workResolver) User(ctx context.Context, obj *model.Work) (*model.User, error) {
	// users, err := r.UserLoader.Load(obj.UserID)
	// user := model.User{}
	// result := r.DB.Find(&user, users)
	// 	fmt.Println(user)
	// fmt.Println(result)
	// fmt.Println("error")
	// fmt.Println(err)
	user := model.User{ID: obj.UserID}
	r.DB.Debug().First(&user)
	return &user, nil
}

// Work returns generated.WorkResolver implementation.
func (r *Resolver) Work() generated.WorkResolver { return &workResolver{r} }

type workResolver struct{ *Resolver }
