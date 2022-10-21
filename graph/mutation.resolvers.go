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
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.CreateUserInput) (*model.User, error) {
	id := fmt.Sprintf("%v:%d", input.Email, rand.Int())
	user := model.User{
		ID:       base64.StdEncoding.EncodeToString([]byte(id)),
		IsAdmin:  input.IsAdmin,
		Name:     input.Name,
		Email:    input.Email,
		Password: input.Password,
		IsAble:   true,
	}
	result := r.DB.Create(&user)
	return &user, result.Error
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.UpdateUserInput) (*model.User, error) {
	user := model.User{ID: input.ID}
	r.DB.First(&user)
	if input.IsAdmin == nil {
		input.IsAdmin = &user.IsAdmin
	}
	if input.Name == nil {
		input.Name = &user.Name
	}
	if input.Email == nil {
		input.Email = &user.Email
	}
	r.DB.Model(&user).Updates(model.User{IsAdmin: *input.IsAdmin, Name: *input.Name, Email: *input.Email})
	result := r.DB.Save(&user)
	return &user, result.Error
}

// DeleteUser is the resolver for the deleteUser field.
func (r *mutationResolver) DeleteUser(ctx context.Context, id string) (*bool, error) {
	user := model.User{ID: id}
	r.DB.First(&user)
	r.DB.Model(&user).Update("IsAble", true)
	result := r.DB.Save(&user)
	b := true
	if result.Error != nil {
		b = false
	}
	return &b, result.Error
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
	if input.URL == nil {
		input.URL = &work.URL
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
		URL:            *input.URL,
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

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
