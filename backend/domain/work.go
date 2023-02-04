package domain

import "context"

type Work struct {
	ID             string  `json:"id"`
	Title          string  `json:"title"`
	Summary        *string `json:"summary"`
	ImageURL       *string `json:"image_url"`
	Duration       *string `json:"duration"`
	NumberOfPeople *int    `json:"number_of_people"`
	Language       *string `json:"language"`
	Role           *string `json:"role"`
	URL            *string `json:"url"`
	BriefStory     *string `json:"brief_story"`
	CreatedAt      string  `json:"created_at"`
	UpdatedAt      string  `json:"updated_at"`
	IsDelete       bool    `json:"is_delete"`
	UserID         string  `json:"user"`
}

func (Work) IsNode()            {}
func (this Work) GetID() string { return this.ID }

// WorkUseCase represent the work's usecases
type IWorkUseCase interface {
	GetByID(ctx context.Context, id string) (*Work, error)
	GetAll(ctx context.Context, limit int, offset int) (*WorkPagination, error)
	Create(ctx context.Context, input CreateWorkInput) error
	Update(ctx context.Context, work *Work, input UpdateWorkInput) error
	Delete(ctx context.Context, ids []*string) error
}

// WorkRepository represent the work's repository contract
type IWorkRepository interface {
	GetByID(ctx context.Context, id string) (*Work, error)
	GetTotalCount(ctx context.Context) (int64, error)
	GetAll(ctx context.Context, limit int, offset int) ([]*Work, int64, error)
	Create(ctx context.Context, input CreateWorkInput) error
	Update(ctx context.Context, work *Work, input UpdateWorkInput) error
	Delete(ctx context.Context, ids []*string) error
}
