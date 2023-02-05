package repository

import (
	"context"
	"encoding/base64"
	"fmt"
	"math/rand"
	"time"

	"github.com/shion0625/portfolio-creator/backend/domain"
	"github.com/shion0625/portfolio-creator/backend/infrastructure"
	"github.com/shion0625/portfolio-creator/backend/util"
)

type WorkRepository struct {
	db *infrastructure.SQLHandler
}

func NewWorkRepository(db *infrastructure.SQLHandler) domain.IWorkRepository {
	return &WorkRepository{db}
}

func (g *WorkRepository) GetByID(ctx context.Context, id string) (*domain.Work, error) {
	work := domain.Work{ID: id}
	if err := g.db.Conn.Where("id = ?", id).First(&work).Error; err != nil {
		return nil, err
	}

	return &work, nil
}

func (g *WorkRepository) GetTotalCount(ctx context.Context) (int64, error) {
	var totalCount int64
	if err := g.db.Conn.Model(&domain.Work{}).Where("is_delete = ?", "False").Count(&totalCount).Error; err != nil {
		return 0, err
	}
	return totalCount, nil
}

func (g *WorkRepository) GetAll(ctx context.Context, limit int, offset int) ([]*domain.Work, int64, error) {
	var works []*domain.Work
	result := g.db.Conn.Limit(limit).Offset(offset).Find(&works)
	if result.Error != nil {
		return nil, 0, result.Error
	}

	return works, result.RowsAffected, nil
}

func (g *WorkRepository) GetByUserIDs(ids []string) ([]*domain.Work, error) {
	var works []*domain.Work
	if err := g.db.Conn.Where("user_id IN ?", ids).Find(&works).Error; err != nil {
		return nil, err
	}
	return works, nil
}

func (g *WorkRepository) Create(ctx context.Context, input domain.CreateWorkInput) error {
	id := fmt.Sprintf("work:%d", rand.Int())
	work := domain.Work{
		ID:             base64.StdEncoding.EncodeToString([]byte(id)),
		Title:          input.Title,
		Summary:        input.Summary,
		ImageURL:       input.ImageURL,
		Duration:       input.Duration,
		NumberOfPeople: input.NumberOfPeople,
		Language:       input.Language,
		Role:           input.Role,
		URL:            input.URL,
		BriefStory:     input.BriefStory,
		CreatedAt:      util.Time2str(time.Now()),
		UpdatedAt:      util.Time2str(time.Now()),
		IsDelete:       false,
		UserID:         input.UserID,
	}
	if err := g.db.Conn.Create(&work).Error; err != nil {
		return err
	}

	return nil
}

func (g *WorkRepository) Update(ctx context.Context, work *domain.Work, input domain.UpdateWorkInput) error {
	if err := g.db.Conn.Model(work).Updates(domain.Work{
		Title:          *input.Title,
		Summary:        input.Summary,
		ImageURL:       input.ImageURL,
		Duration:       input.Duration,
		NumberOfPeople: input.NumberOfPeople,
		Language:       input.Language,
		Role:           input.Role,
		URL:            input.URL,
		BriefStory:     input.BriefStory,
		UpdatedAt:      util.Time2str(time.Now()),
	}).Error; err != nil {
		return err
	}

	return nil
}

func (g *WorkRepository) Delete(ctx context.Context, ids []*string) error {
	if err := g.db.Conn.Model(domain.Work{}).Where("id IN ?", ids).Updates(domain.Work{
		IsDelete:  true,
		UpdatedAt: util.Time2str(time.Now()),
	}).Error; err != nil {
		return err
	}
	return nil
}
