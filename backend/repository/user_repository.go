package repository

import (
	"context"
	"errors"
	"fmt"

	"github.com/shion0625/portfolio-creator/backend/domain"
	"github.com/shion0625/portfolio-creator/backend/infrastructure"
	"github.com/shion0625/portfolio-creator/backend/util"
)

type UserRepository struct {
	// Dealing with databases
	db *infrastructure.SQLHandler
}

// NewUserRepository will create new an UserRepository object representation of domain.IUserRepository.
func NewUserRepository(db *infrastructure.SQLHandler) domain.IUserRepository {
	return &UserRepository{db}
}

/*
GetByID is based on the entered id and retrieves information about the user matching that id.
Returns the domain.User structure if the user specified in the argument is in the database, or nil otherwise.
If an unexpected error occurs, the error wrapped in GetByID-usecase: is returned.
*/
func (g *UserRepository) GetByID(ctx context.Context, id string) (*domain.User, error) {
	var user domain.User
	if err := g.db.Conn.Where("id = ?", id).Take(&user).Error; err != nil {
		return nil, fmt.Errorf("GetByID - repository: %w", err)
	}

	return &user, nil
}

/*
GetByEmail is based on the entered email and retrieves information about the user matching that email.
Returns the domain.User structure if the user specified in the argument is in the database, or nil otherwise.
If an unexpected error occurs, the error wrapped in GetByEmail-usecase: is returned.
*/
func (g *UserRepository) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	var user domain.User
	if err := g.db.Conn.Where("email LIKE ?", email).Find(&user).Error; err != nil {
		return nil, fmt.Errorf("GetByEmail - repository: %w", err)
	}

	return &user, nil
}

func (g *UserRepository) GetTotalCount(ctx context.Context, keyword *string) (int64, error) {
	var totalCount int64

	columns := []string{"name"}
	if err := g.db.Conn.Model(&domain.User{}).Scopes(util.WhereKeyword(keyword, columns)).Count(&totalCount).Error; err != nil {
		return 0, fmt.Errorf("GetTotalCount - repository: %w", err)
	}

	return totalCount, nil
}

/*
GetAll retrieves information for multiple users based on the limit and offset entered.
The limit is the number of data to retrieve.
The offset is the number of data to start retrieving.
It returns a []*domain.User if the user specified in the argument exists in the database, or nil otherwise.
If an unexpected error occurs, an error wrapped in GetAll-usecase is returned.
*/
func (g *UserRepository) GetAll(ctx context.Context, limit int, offset int) ([]*domain.User, int64, error) {
	var users []*domain.User
	result := g.db.Conn.Limit(limit).Offset(offset).Find(&users)

	if !errors.Is(result.Error, nil) {
		return nil, 0, result.Error
	}

	return users, result.RowsAffected, nil
}

func (g *UserRepository) GetByIDs(ids []string) ([]*domain.User, error) {
	var users []*domain.User

	if err := g.db.Conn.Debug().Table("users").Where("id IN ?", ids).Take(&users).Error; err != nil {
		return nil, fmt.Errorf("GetByIDs - repository: %w", err)
	}

	return users, nil
}

func (g *UserRepository) GetByKeyword(ctx context.Context, keyword string, limit int, searched string, num int) ([]*domain.User, int64, error) {
	var users []*domain.User

	columns := []string{"name"}

	result := g.db.Conn.Debug().Limit(limit).Scopes(util.WhereKeyword(&keyword, columns)).Find(&users)

	if err := result.Error; !errors.Is(err, nil) {
		return nil, 0, fmt.Errorf("GetByKeyword - repository: %w", err)
	}

	return users, result.RowsAffected, nil
}
