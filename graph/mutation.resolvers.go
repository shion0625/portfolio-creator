package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"encoding/base64"
	"fmt"
	"math/rand"

	"github.com/shion0625/my-portfolio-backend/graph/generated"
	"github.com/shion0625/my-portfolio-backend/graph/model"
	"github.com/shion0625/my-portfolio-backend/service"
)

// UpdateProfile is the resolver for the updateProfile field.
func (r *mutationResolver) UpdateProfile(ctx context.Context, input model.UpdateProfileInput) (*model.User, error) {
	panic(fmt.Errorf("not implemented: UpdateProfile - updateProfile"))
}

// CreateWork is the resolver for the createWork field.
func (r *mutationResolver) CreateWork(ctx context.Context, input model.CreateWorkInput) (*model.Work, error) {
	id := fmt.Sprintf("work:%d", rand.Int())
	work := model.Work{
		ID:             base64.StdEncoding.EncodeToString([]byte(id)),
		Title:          input.Title,
		Summary:        input.Summary,
		ImageURL:       input.ImageURL,
		Duration:       input.Duration,
		NumberOfPeople: input.NumberOfPeople,
		Language:       input.Language,
		Role:           input.Role,
		URL:            input.URL,
		BriefStory:     input.BriefStory,
		UserID:         input.UserID,
	}
	r.DB.Create(&work)
	return &work, nil
}

// UpdateWork is the resolver for the updateWork field.
func (r *mutationResolver) UpdateWork(ctx context.Context, input model.UpdateWorkInput) (*model.Work, error) {
	work := model.Work{ID: input.ID}
	if input.Title == nil {
		input.Title = &work.Title
	}
	r.DB.First(&work)
	r.DB.Model(&work).Updates(model.Work{
		Title:          *input.Title,
		Summary:        input.Summary,
		ImageURL:       input.ImageURL,
		Duration:       input.Duration,
		NumberOfPeople: input.NumberOfPeople,
		Language:       input.Language,
		Role:           input.Role,
		URL:            input.URL,
		BriefStory:     input.BriefStory,
	})
	result := r.DB.Save(&work)
	return &work, result.Error
}

// DeleteWork is the resolver for the deleteWork field.
func (r *mutationResolver) DeleteWork(ctx context.Context, id string) (*bool, error) {
	work := model.Work{ID: id}
	result := r.DB.Delete(&work)
	b := true
	if result.Error != nil {
		b = false
	}
	return &b, result.Error
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, id string, email string) (interface{}, error) {
	return service.UserLogin(ctx, id, email)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
