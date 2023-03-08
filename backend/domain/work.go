package domain

import "context"

type Work struct {
	ID             string  `json:"id"`
	Title          string  `json:"title"`
	Summary        *string `json:"summary"`
	ImageURL       *string `json:"imageUrl"`
	Duration       *string `json:"duration"`
	NumberOfPeople *int    `json:"numberOfPeople"`
	Language       *string `json:"language"`
	Role           *string `json:"role"`
	URL            *string `json:"url"`
	BriefStory     *string `json:"briefStory"`
	CreatedAt      string  `json:"createdAt"`
	UpdatedAt      string  `json:"updatedAt"`
	IsDelete       bool    `json:"isDelete"`
	UserID         string  `json:"userId"`
	SerialNumber   int     `json:"serialNumber" gorm:"autoIncrement"`
}

func (Work) IsNode()            {}
func (this Work) GetID() string { return this.ID }

// WorkUseCase represent the work's usecases.
type IWorkUseCase interface {
	GetByID(ctx context.Context, id string) (*Work, error)
	GetAll(ctx context.Context, sortBy SortBy, searchedAt string, num int, limit int) (*WorkPagination, error)
	Search(ctx context.Context, keyword string, sortBy SortBy, searchedAt string, num int, limit int) (*WorkPagination, error)
	Create(ctx context.Context, input CreateWorkInput) error
	Update(ctx context.Context, work *Work, input UpdateWorkInput) error
	Delete(ctx context.Context, ids []*string) error
}

// WorkRepository represent the work's repository contract.
type IWorkRepository interface {
	GetByID(ctx context.Context, id string) (*Work, error)
	GetTotalCount(ctx context.Context, keyword *string) (int64, error)
	GetAll(ctx context.Context, sortBy SortBy, searchedAt string, num int, limit int) ([]*Work, int64, error)
	GetByUserIDs(ids []string) ([]*Work, error)
	GetByKeyword(ctx context.Context, keyword string, sortBy SortBy, searchedAt string, num int, limit int) ([]*Work, int64, error)
	Create(ctx context.Context, input CreateWorkInput) error
	Update(ctx context.Context, work *Work, input UpdateWorkInput) error
	Delete(ctx context.Context, ids []*string) error
}
