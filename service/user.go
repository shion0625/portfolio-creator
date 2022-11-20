package service

import (
	"context"
	"github.com/shion0625/my-portfolio-backend/graph/model"
	"github.com/shion0625/my-portfolio-backend/db"
	// "gorm.io/gorm"
	// "github.com/vektah/gqlparser/v2/gqlerror"

)

func UserGetByID(ctx context.Context, id string) (*model.User, error) {
	db := db.ConnectGORM()
	var user model.User
	if err := db.Table("users").Where("id = ?", id).Take(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UserGetByEmail(ctx context.Context, email string) (*model.User, error) {
	db := db.ConnectGORM()
	var user model.User
	if err := db.Table("users").Where("email LIKE ?", email).Take(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}


// func UserUpdateByID(ctx context.Context, input model.UpdateProfileInput) (*model.User, error){
// 	db := db.ConnectGORM()
// 	user, err :=UserGetByID(ctx, input.ID)
// 	if err != nil {
// 		// if user not found
// 		if err == gorm.ErrRecordNotFound {
// 			return nil, &gqlerror.Error{
// 				Message: "id not found",
// 			}
// 		}
// 		return nil, err
// 	}

// 	if input.Name == nil {
// 		input.Name = user.Name
// 	}
// 	if input.Email == nil {
// 		input.Email = user.Email
// 	}

// 	if err := db.Model(&user).Updates(model.User{Name: input.Name, Email: input.Email}).Error; err != nil {
// 		return nil, err
// 	}
// 	if err := db.Save(&user).Error; err != nil {
// 		return nil, err
// 	}
// 	return user, nil
// }
