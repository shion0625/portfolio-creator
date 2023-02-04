package service

import (
	"context"
	"github.com/shion0625/portfolio-creater/backend/domain"
	"github.com/shion0625/portfolio-creater/backend/infrastructure"
	"gorm.io/gorm"
	// "github.com/vektah/gqlparser/v2/gqlerror"

)

func UserGetByID(ctx context.Context, db *gorm.DB, id string) (*domain.User, error) {
	var user domain.User
	if err := db.Where("id = ?", id).Find(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UserGetByEmail(ctx context.Context, email string) (*domain.User, error) {
	db := infrastructure.ConnectGORM()
	var user domain.User
	if err := db.Table("users").Where("email LIKE ?", email).Take(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UserTotalCountGet(ctx context.Context,db *gorm.DB) (int64, error) {
	var totalCount int64
	if err := db.Model(&domain.User{}).Count(&totalCount).Error; err != nil {
		return 0, err
	}
	return totalCount, nil
}

func UsersGet(ctx context.Context, db *gorm.DB, limit int, offset int) ([]*domain.User,int64, error) {
	var users []*domain.User
	result := db.Limit(limit).Offset(offset).Find(&users)
	if result.Error != nil {
		return nil,0, result.Error
	}

	return users, result.RowsAffected, nil
}
// func UserUpdateByID(ctx context.Context, input domain.UpdateProfileInput) (*domain.User, error){
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

// 	if err := db.Model(&user).Updates(domain.User{Name: input.Name, Email: input.Email}).Error; err != nil {
// 		return nil, err
// 	}
// 	if err := db.Save(&user).Error; err != nil {
// 		return nil, err
// 	}
// 	return user, nil
// }
