package resolver

//go:generate go run github.com/99designs/gqlgen generate

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.
import (
	"github.com/shion0625/portfolio-creater/backend/config/dataloader"
	"github.com/shion0625/portfolio-creater/backend/usecase"
	"gorm.io/gorm"
)

type Resolver struct {
	userUseCase usecase.UserUseCase
	workUseCase usecase.WorkUseCase
	WorkLoader   *dataloader.WorkLoader
	UserLoader   *dataloader.UserLoader
	DB           *gorm.DB
}

func NewResolver(uu usecase.UserUseCase, wu usecase.WorkUseCase) *Resolver {
	return &Resolver{
		userUseCase: uu,
		workUseCase: wu,
	}
}
