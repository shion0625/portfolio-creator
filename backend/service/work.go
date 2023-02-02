package service

import (
	"context"
	"github.com/shion0625/portfolio-creater/backend/graph/model"
	"gorm.io/gorm"

)

func WorkGetByID(ctx context.Context, db *gorm.DB, id string) (*model.Work, error) {
	work := model.Work{ID: id}
	if err := db.Where("id = ?", id).First(&work).Error; err != nil {
		return nil, err
	}

	return &work, nil
}

func WorkTotalCount(ctx context.Context, db *gorm.DB) (int64, error) {
	var totalCount int64
	if err := db.Model(&model.Work{}).Where("is_delete = ?", "False").Count(&totalCount).Error; err != nil {
		return 0, err
	}
	return totalCount, nil
}

func WorksGet(ctx context.Context, db *gorm.DB, limit int, offset int) ([]*model.Work,int64, error) {
	var works []*model.Work
	result := db.Limit(limit).Offset(offset).Find(&works)
	if result.Error != nil {
		return nil,0, result.Error
	}

	return works,result.RowsAffected, nil
}
