package directives

import (
	"github.com/shion0625/portfolio-creater/backend/graph/model"
)
type contextKey string
const roleContextKey contextKey = "roleKey"


func HasRole(directive string, role []model.Role) bool {
	for _, v := range role{
		v := v.String()
			if v == directive{
				return true
			}
		}
		return false
	}
