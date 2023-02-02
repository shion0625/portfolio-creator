package service

import (
	"context"
	"github.com/shion0625/portfolio-creater/backend/graph/model"
	"github.com/shion0625/portfolio-creater/backend/db"
	"gorm.io/gorm"
	// "github.com/vektah/gqlparser/v2/gqlerror"

)

func UserGetByID(ctx context.Context, db *gorm.DB, id string) (*model.User, error) {
	var user model.User
	if err := db.Where("id = ?", id).Find(&user).Error; err != nil {
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

func UserTotalCountGet(ctx context.Context,db *gorm.DB) (int64, error) {
	var totalCount int64
	if err := db.Model(&model.User{}).Count(&totalCount).Error; err != nil {
		return 0, err
	}
	return totalCount, nil
}

func UsersGet(ctx context.Context, db *gorm.DB, limit int, offset int) ([]*model.User,int64, error) {
	var users []*model.User
	result := db.Limit(limit).Offset(offset).Find(&users)
	if result.Error != nil {
		return nil,0, result.Error
	}

	return users, result.RowsAffected, nil
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
