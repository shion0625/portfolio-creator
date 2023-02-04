package repository

import (
	"context"

	"github.com/shion0625/portfolio-creater/backend/domain"
	"gorm.io/gorm"
)
type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.IUserRepository{
	return &UserRepository{db}
}

func (m *UserRepository) GetByID(ctx context.Context, id string) (*domain.User, error) {
	var user domain.User
	if err := m.db.Where("id = ?", id).Find(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (m *UserRepository) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	var user domain.User
	if err := m.db.Where("email LIKE ?", email).Find(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (m *UserRepository) GetTotalCount(ctx context.Context) (int64, error) {
	var totalCount int64
	if err := m.db.Model(&domain.User{}).Count(&totalCount).Error; err != nil {
		return 0, err
	}
	return totalCount, nil
}


func (m *UserRepository) GetAll(ctx context.Context, limit int, offset int) ([]*domain.User, int64, error) {
	var users []*domain.User
	result := m.db.Limit(limit).Offset(offset).Find(&users)
	if result.Error != nil {
		return nil,0, result.Error
	}

	return users, result.RowsAffected, nil
}
