package util

import (
	"gorm.io/gorm"
)

func SortWork(order string, searched string, num int) func(ddb *gorm.DB) *gorm.DB {
	return func(ddb *gorm.DB) *gorm.DB {
		if order == "update" {
			return ddb.Where("works.updated_at < ?", searched).
				Not("works.updated_at = ? AND works.number_of_work >= ?", searched, num).
				Order("works.updated_at DESC").Order("works.number_of_work DESC")
		}

		if order == "create" {
			return ddb.Where("works.created_at < ?").Order("works.created_at DESC")
		}

		if order == "low" {
			return ddb.Order("price ASC")
		}

		if order == "high" {
			return ddb.Order("price DESC")
		}

		return ddb
	}
}
