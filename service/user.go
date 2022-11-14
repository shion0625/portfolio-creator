package service

import (
	"context"
	"github.com/shion0625/my-portfolio-backend/graph/model"
	"github.com/shion0625/my-portfolio-backend/tools"
	"strings"
	"github.com/google/uuid"
	"github.com/shion0625/my-portfolio-backend/db"
	"gorm.io/gorm"
	"github.com/vektah/gqlparser/v2/gqlerror"

)

func UserCreate(ctx context.Context, input model.CreateUserInput) (*model.User, error) {
	db := db.ConnectGORM()

	input.Password = tools.HashPassword(input.Password)
	user := model.User{
		ID:       uuid.New().String(),
		IsAdmin:  input.IsAdmin,
		Name:     input.Name,
		Email:    strings.ToLower(input.Email),
		Password: input.Password,
		IsAble:   true,
	}
	if err := db.Model(user).Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UserGetByID(ctx context.Context, id string) (*model.User, error) {
	db := db.ConnectGORM()
	var user model.User
	if err := db.Model(user).Where("id = ?", id).Take(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UserGetByEmail(ctx context.Context, email string) (*model.User, error) {
	db := db.ConnectGORM()
	var user model.User
	if err := db.Model(user).Where("email LIKE ?", email).Take(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}


func UserUpdateByID(ctx context.Context, input model.UpdateUserInput) (*model.User, error){
	db := db.ConnectGORM()
	user, err :=UserGetByID(ctx, input.ID)
	if err != nil {
		// if user not found
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "id not found",
			}
		}
		return nil, err
	}

	if input.IsAdmin == nil {
		input.IsAdmin = &user.IsAdmin
	}
	if input.Name == nil {
		input.Name = &user.Name
	}
	if input.Email == nil {
		input.Email = &user.Email
	}

	if err := db.Model(&user).Updates(model.User{IsAdmin: *input.IsAdmin, Name: *input.Name, Email: *input.Email}).Error; err != nil {
		return nil, err
	}
	if err := db.Save(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
