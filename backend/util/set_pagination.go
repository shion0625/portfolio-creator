package util

import (
	"math"

	"github.com/shion0625/portfolio-creator/backend/domain"
)

func SetPaginationInfo(limit int, totalCount int64, numRows int64) domain.PaginationInfo {
	pageInfo := domain.PaginationInfo{
		Page:             0,
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      false,
		HasPreviousPage:  false,
		Count:            int(numRows),
		TotalCount:       int(totalCount),
	}

	return pageInfo
}
