package resolver

//go:generate go run github.com/99designs/gqlgen generate

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"github.com/shion0625/portfolio-creator/backend/config/dataloader"
	"github.com/shion0625/portfolio-creator/backend/domain"
)

type Loader struct {
	UsersByIDs     *dataloader.UserLoader
	WorksByUserIDs *dataloader.WorkLoader
}

type Resolver struct {
	userUseCase       domain.IUserUseCase
	workUseCase       domain.IWorkUseCase
	dataLoaderUseCase Loader
}

func NewResolver(uu domain.IUserUseCase, wu domain.IWorkUseCase, dlu dataloader.IDataLoaderUseCase) *Resolver {
	return &Resolver{
		userUseCase: uu,
		workUseCase: wu,
		dataLoaderUseCase: Loader{
			UsersByIDs:     dlu.UsersByIDs(),
			WorksByUserIDs: dlu.WorksByUserIDs(),
		},
	}
}
