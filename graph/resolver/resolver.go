package resolver

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import(
	"gorm.io/gorm"
	"github.com/shion0625/my-portfolio-backend/dataloader"
)

type Resolver struct{
	UserLoader *dataloader.UserLoader
	WorkLoader *dataloader.WorkLoader
	DB *gorm.DB
}
