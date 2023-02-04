package usecase

import (
	"context"

	"github.com/shion0625/portfolio-creater/backend/domain"
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

func (u UserUseCase) GetByEmail(ctx context.Context, email string)(*domain.User, error){
	return u.userRepo.GetByEmail(ctx, email)
}

func (u UserUseCase) GetTotalCount(ctx context.Context)(int64, error){
	return u.userRepo.GetTotalCount(ctx)
}

func (u UserUseCase) GetAll(ctx context.Context, limit int, offset int)([]*domain.User,int64, error){
	return u.userRepo.GetAll(ctx, limit, offset)
}
