package util

import (
	"fmt"
	"strings"

	"gorm.io/gorm"
)

func WhereKeyword(keyword *string, columns []string) func(ddb *gorm.DB) *gorm.DB {
	return func(ddb *gorm.DB) *gorm.DB {
		if keyword == nil {
			return ddb.Where("is_delete = ?", "False")
		} else {
			var WhereQuery string

			keywords := strings.Fields(*keyword)

			for i, column := range columns {
				for j, keyword := range keywords {
					WhereQuery += fmt.Sprintf("%s LIKE '%%%s%%'", column, keyword)
					if i != len(columns)-1 || j != len(keywords)-1 {
						WhereQuery += " OR "
					}
				}
			}

			return ddb.Where("is_delete = ?", "False").Where(WhereQuery)
		}
	}
}
