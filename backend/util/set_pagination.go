package util

import (
	"math"

	"github.com/shion0625/portfolio-creator/backend/domain"
)

func SetPagination(data interface{}, limit int, totalCount int64, numRows int64) interface{} {
	pageInfo := domain.PaginationInfo{
		Page:             0,
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      false,
		HasPreviousPage:  false,
		Count:            int(numRows),
		TotalCount:       int(totalCount),
	}

	switch nodes := data.(type) {
	case []*domain.User:
		return &domain.UserPagination{
			Type:     domain.ModelUser,
			PageInfo: &pageInfo,
			Nodes:    nodes,
		}
	case []*domain.Work:
		return &domain.WorkPagination{
			Type:     domain.ModelWork,
			PageInfo: &pageInfo,
			Nodes:    nodes,
		}
	default:
		return nil
	}
}
