package util

import (
	"github.com/shion0625/portfolio-creator/backend/domain"
	"gorm.io/gorm"
)

func SortWork(sortBy domain.SortBy, searched string, num int) func(ddb *gorm.DB) *gorm.DB {
	return func(ddb *gorm.DB) *gorm.DB {
		if sortBy == "update" {
			return ddb.Where("works.updated_at < ?", searched).Not("works.updated_at = ? AND works.serial_number >= ?", searched, num).Order("works.updated_at DESC").Order("works.serial_number DESC")
		}

		if sortBy == "create" {
			return ddb.Where("works.created_at < ?", searched).Not("works.created_at = ? AND works.serial_number >= ?", searched, num).Order("works.created_at DESC").Order("works.serial_number DESC")
		}

		if sortBy == "low" {
			return ddb.Order("price ASC")
		}

		if sortBy == "high" {
			return ddb.Order("price DESC")
		}

		return ddb
	}
}
