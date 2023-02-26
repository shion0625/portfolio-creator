package usecase

import (
	"context"
	"errors"
	"fmt"
	"math"

	"github.com/shion0625/portfolio-creator/backend/config/auth"
	"github.com/shion0625/portfolio-creator/backend/domain"
)

type UserUseCase struct {
	// User's repository.
	userRepo domain.IUserRepository
}

// NewUserUseCase will create new an userUseCase object representation of domain.IUserUseCase.
func NewUserUseCase(u domain.IUserRepository) domain.IUserUseCase {
	return &UserUseCase{
		userRepo: u,
	}
}

/*
GetByID is based on the entered id and retrieves information about the user matching that id.
Returns the domain.User structure if the user specified in the argument is in the database, or nil otherwise.
If an unexpected error occurs, the error wrapped in GetByID-usecase: is returned.
*/
func (u UserUseCase) GetByID(ctx context.Context, id string) (*domain.User, error) {
	user, err := u.userRepo.GetByID(ctx, id)
	if !errors.Is(err, nil) {
		return nil, fmt.Errorf("GetByID - usecase: %w", err)
	}

	return user, nil
}

/*
GetByEmail is based on the entered email and retrieves information about the user matching that email.
Returns the domain.User structure if the user specified in the argument is in the database, or nil otherwise.
If an unexpected error occurs, the error wrapped in GetByEmail-usecase: is returned.
*/
func (u UserUseCase) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	user, err := u.userRepo.GetByEmail(ctx, email)

	if !errors.Is(err, nil) {
		return nil, fmt.Errorf("GetByEmail - usecase: %w", err)
	}

	return user, nil
}

/*
GetAll retrieves information for multiple users based on the limit and offset entered.
The limit is the number of data to retrieve.
The offset is the number of data to start retrieving.
It returns a domain.UserPagination structure if the user specified in the argument exists in the database, or nil otherwise.
If an unexpected error occurs, an error wrapped in GetAll-usecase or GetAll - GetTotalCount - usecase: is returned.
*/
func (u UserUseCase) GetAll(ctx context.Context, limit int, offset int) (*domain.UserPagination, error) {
	totalCount, err := u.userRepo.GetTotalCount(ctx, nil)
	if err != nil {
		return nil, fmt.Errorf("GetAll - GetTotalCount - usecase: %w", err)
	}

	users, numRows, err := u.userRepo.GetAll(ctx, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("GetAll - usecase: %w", err)
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

func (u UserUseCase) Search(ctx context.Context, keyword string, limit int, searched string, num int) (*domain.UserPagination, error) {
	totalCount, err := u.userRepo.GetTotalCount(ctx, &keyword)
	if err != nil {
		return nil, fmt.Errorf("Search - GetTotalCount - usecase: %w", err)
	}

	users, numRows, err := u.userRepo.GetByKeyword(ctx, keyword, limit, searched, num)
	if err != nil {
		return nil, fmt.Errorf("Search - GetByKeyword - usecase: %w", err)
	}

	pageInfo := domain.PaginationInfo{
		Page:             0,
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      false,
		HasPreviousPage:  false,
		Count:            int(numRows),
		TotalCount:       int(totalCount),
	}
	workPagination := domain.UserPagination{
		PageInfo: &pageInfo,
		Nodes:    users,
	}

	return &workPagination, nil
}

/*
Login retrieves the token of the matching user based on the entered id and email.
If the user specified in the argument exists in the database, return a token in the form map[string]interface{}, otherwise return nil
If an unexpected error occurs, an error wrapped in Login-GetByEmail-usecase or Login-JwtGenerate-usecase: is returned.
*/
func (u UserUseCase) Login(ctx context.Context, id string, email string) (interface{}, error) {
	getUser, err := u.userRepo.GetByEmail(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("Login - GetByEmail - usecase: %w", err)
	}

	token, err := auth.JwtGenerate(ctx, getUser.ID)
	if err != nil {
		return nil, fmt.Errorf("Login - JwtGenerate - usecase: %w", err)
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
