package graph

//go:generate go run github.com/99designs/gqlgen generate

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.
import (
	"github.com/shion0625/my-portfolio-backend/dataloader"
	"gorm.io/gorm"
)

type Resolver struct{
	WorkLoader *dataloader.WorkLoader
	UserLoader *dataloader.UserLoader
	DB *gorm.DB
}
