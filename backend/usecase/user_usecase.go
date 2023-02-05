package usecase

import (
	"context"
	"math"

	"github.com/shion0625/portfolio-creater/backend/config/auth"
	"github.com/shion0625/portfolio-creater/backend/config/dataloader"
	"github.com/shion0625/portfolio-creater/backend/domain"
)

type UserUseCase struct {
	userRepo   domain.IUserRepository
	userLoader dataloader.IDataLoader
}

// NewUserUseCase will create new an userUseCase object representation of domain.UserUseCase interface
func NewUserUseCase(u domain.IUserRepository, ul dataloader.IDataLoader) domain.IUserUseCase {
	return &UserUseCase{
		userRepo:   u,
		userLoader: ul,
	}
}

func (u UserUseCase) GetByID(ctx context.Context, id string) (*domain.User, error) {
	return u.userRepo.GetByID(ctx, id)
}

func (u UserUseCase) GetByIDLoad(ctx context.Context, id string) (*domain.User, error) {
	return u.userLoader.UsersByIDs().Load(id)
}

func (u UserUseCase) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	return u.userRepo.GetByEmail(ctx, email)
}

func (u UserUseCase) GetAll(ctx context.Context, limit int, offset int) (*domain.UserPagination, error) {
	totalCount, err := u.userRepo.GetTotalCount(ctx)
	if err != nil {
		return nil, err
	}

	users, numRows, err := u.userRepo.GetAll(ctx, limit, offset)
	if err != nil {
		return nil, err
	}
	pageInfo := domain.PaginationInfo{
		Page:             int(math.Ceil(float64(offset) / float64(limit))),
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      int(totalCount) < (limit + offset),
		HasPreviousPage:  (limit < offset),
		Count:            int(numRows),
		TotalCount:       int(totalCount),
	}

	userPagination := domain.UserPagination{
		PageInfo: &pageInfo,
		Nodes:    users,
	}

	return &userPagination, nil
}

func (u UserUseCase) Login(ctx context.Context, id string, email string) (interface{}, error) {
	getUser, err := u.userRepo.GetByEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	token, err := auth.JwtGenerate(ctx, getUser.ID)
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
