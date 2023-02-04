package service

import (
	"encoding/base64"
	"fmt"
	"math/rand"
	"time"

	"context"
	"github.com/shion0625/portfolio-creater/backend/domain"
	"gorm.io/gorm"

)

func WorkGetByID(ctx context.Context, db *gorm.DB, id string) (*domain.Work, error) {
	work := domain.Work{ID: id}
	if err := db.Where("id = ?", id).First(&work).Error; err != nil {
		return nil, err
	}

	return &work, nil
}

func WorkTotalCountGet(ctx context.Context, db *gorm.DB) (int64, error) {
	var totalCount int64
	if err := db.Model(&domain.Work{}).Where("is_delete = ?", "False").Count(&totalCount).Error; err != nil {
		return 0, err
	}
	return totalCount, nil
}

func WorksGet(ctx context.Context, db *gorm.DB, limit int, offset int) ([]*domain.Work,int64, error) {
	var works []*domain.Work
	result := db.Limit(limit).Offset(offset).Find(&works)
	if result.Error != nil {
		return nil,0, result.Error
	}

	return works,result.RowsAffected, nil
}

func WorkCreate(ctx context.Context, db *gorm.DB,input domain.CreateWorkInput) (*domain.Work, error) {
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
		CreatedAt:      Time2str(time.Now()),
		UpdatedAt:      Time2str(time.Now()),
		IsDelete:       false,
		UserID:         input.UserID,
	}
	if err := db.Create(&work).Error; err != nil {
		return nil, err
	}

	return &work, nil
}

func WorkUpdate(ctx context.Context, db *gorm.DB, work *domain.Work, input domain.UpdateWorkInput) (*domain.Work, error) {
	if err := db.Model(work).Updates(domain.Work{
		Title:          *input.Title,
		Summary:        input.Summary,
		ImageURL:       input.ImageURL,
		Duration:       input.Duration,
		NumberOfPeople: input.NumberOfPeople,
		Language:       input.Language,
		Role:           input.Role,
		URL:            input.URL,
		BriefStory:     input.BriefStory,
		UpdatedAt:      Time2str(time.Now()),
	}).Error; err != nil {
		return nil, err
	}

	return work, nil
}

func WorksDelete(ctx context.Context, db *gorm.DB, ids []*string) (*domain.Work, error) {
	if err:= db.Model(domain.Work{}).Where("id IN ?", ids).Updates(domain.Work{
		IsDelete: true,
		UpdatedAt: Time2str(time.Now()),
	}).Error; err != nil {
		return nil, err
	}
	return nil, nil
}
