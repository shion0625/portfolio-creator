package usecase

import (
	"context"

	"github.com/shion0625/portfolio-creater/backend/domain"
	"github.com/shion0625/portfolio-creater/backend/config/jwt"
)

type UserUseCase struct {
	userRepo domain.IUserRepository
}

// NewUserUseCase will create new an userUseCase object representation of domain.UserUseCase interface
func NewUserUseCase(u domain.IUserRepository) domain.IUserUseCase {
	return &UserUseCase{
		userRepo: u,
	}
}

func (u UserUseCase) GetByID(ctx context.Context, id string) (*domain.User, error) {
	return u.userRepo.GetByID(ctx, id)
}

func (u UserUseCase) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	return u.userRepo.GetByEmail(ctx, email)
}

func (u UserUseCase) GetTotalCount(ctx context.Context) (int64, error) {
	return u.userRepo.GetTotalCount(ctx)
}

func (u UserUseCase) GetAll(ctx context.Context, limit int, offset int) ([]*domain.User, int64, error) {
	return u.userRepo.GetAll(ctx, limit, offset)
}

func (u UserUseCase)Login(ctx context.Context, id string, email string)(interface{}, error) {
	getUser, err := u.userRepo.GetByEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	token, err := jwt.JwtGenerate(ctx, getUser.ID)
	if err != nil {
		return nil, err
	}
	return map[string]interface{}{
		"token": token,
	}, nil
}

// func UserRegister(ctx context.Context, input model.CreateUserInput) (interface{}, error) {
// 	// Check Email
// 	_, err := UserGetByEmail(ctx, input.Email)
// 	if err == nil {
// 		// if err != record not found
// 		if err != gorm.ErrRecordNotFound {
// 			return nil, err
// 		}
// 	}

// 	createdUser, err := UserCreate(ctx, input)
// 	if err != nil {
// 		return nil, err
// 	}

// 	token, err := JwtGenerate(ctx, createdUser.ID)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return map[string]interface{}{
// 		"token": token,
// 	}, nil
// }


// func UserUpdateByID(ctx context.Context, input domain.UpdateProfileInput) (*domain.User, error){
// 	db := db.ConnectDB()
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
