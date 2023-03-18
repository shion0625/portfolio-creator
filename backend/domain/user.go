package domain

import "context"

// User is representing the User data struct.
type User struct {
	ID            string    `json:"id" gorm:"type:text"`
	Name          *string   `json:"name" gorm:"type:text"`
	Email         *string   `json:"email" gorm:"type:text"`
	EmailVerified []*string `json:"emailVerified" gorm:"type:text[]"`
	Image         *string   `json:"image" gorm:"type:text"`
	CreatedAt     string    `json:"createdAt"`
	UpdatedAt     string    `json:"updatedAt"`
	SerialNumber  int       `json:"serialNumber" gorm:"autoIncrement"`
}

func (User) IsNode()            {}
func (this User) GetID() string { return this.ID }

// UserUseCase represent the user's usecases.
type IUserUseCase interface {
	GetByID(ctx context.Context, id string) (*User, error)
	GetByEmail(ctx context.Context, email string) (*User, error)
	GetAll(ctx context.Context, limit int, offset int) (*UserPagination, error)
	Search(ctx context.Context, keyword string, sortBy SortBy, searchedAt string, num int, limit int) (*UserPagination, error)
	Login(ctx context.Context, id string, email string) (interface{}, error)
}

// UserRepository represent the user's repository contract.
type IUserRepository interface {
	GetByID(ctx context.Context, id string) (*User, error)
	GetByEmail(ctx context.Context, email string) (*User, error)
	GetTotalCount(ctx context.Context, keyword *string) (int64, error)
	GetAll(ctx context.Context, limit int, offset int) ([]*User, int64, error)
	GetByIDs(ids []string) ([]*User, error)
	GetByKeyword(ctx context.Context, keyword string, sortBy SortBy, searchedAt string, num int, limit int) ([]*User, int64, error)
}
