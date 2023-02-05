package repository

import (
	"context"

	"github.com/shion0625/portfolio-creator/backend/domain"
	"github.com/shion0625/portfolio-creator/backend/infrastructure"
)

type UserRepository struct {
	db *infrastructure.SQLHandler
}

func NewUserRepository(db *infrastructure.SQLHandler) domain.IUserRepository {
	return &UserRepository{db}
}

func (g *UserRepository) GetByID(ctx context.Context, id string) (*domain.User, error) {
	var user domain.User
	if err := g.db.Conn.Where("id = ?", id).Find(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (g *UserRepository) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	var user domain.User
	if err := g.db.Conn.Where("email LIKE ?", email).Find(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (g *UserRepository) GetTotalCount(ctx context.Context) (int64, error) {
	var totalCount int64
	if err := g.db.Conn.Model(&domain.User{}).Count(&totalCount).Error; err != nil {
		return 0, err
	}
	return totalCount, nil
}

func (g *UserRepository) GetAll(ctx context.Context, limit int, offset int) ([]*domain.User, int64, error) {
	var users []*domain.User
	result := g.db.Conn.Limit(limit).Offset(offset).Find(&users)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	return users, result.RowsAffected, nil
}

func (g *UserRepository) GetByIDs(ids []string) ([]*domain.User, error) {
	var users []*domain.User

	if err := g.db.Conn.Where("id IN ?", ids).Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}
