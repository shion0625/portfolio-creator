package directives

import (
	"context"
	"fmt"
	"github.com/shion0625/my-portfolio-backend/graph/model"
)
type contextKey string
const roleContextKey contextKey = "roleKey"

func SetToken(parents context.Context, t string) context.Context {
    return context.WithValue(parents, roleContextKey, t)
}

func GetToken(ctx context.Context) (string, error) {
    v := ctx.Value(roleContextKey)

    token, ok := v.(string)
    if !ok {
        return "", fmt.Errorf("token not found")
    }

    return token, nil
}

func HasRole(token string, role []model.Role) bool {
	for _, v := range role{
		v := v.String()
			if v == token{
				return true
			}
		}
		return false
	}
