package dig

import (
	"github.com/pkg/errors"
	"github.com/shion0625/portfolio-creator/backend/config/dataloader"
	"github.com/shion0625/portfolio-creator/backend/graphql/resolver"
	"github.com/shion0625/portfolio-creator/backend/infrastructure"
	"github.com/shion0625/portfolio-creator/backend/repository"
	"github.com/shion0625/portfolio-creator/backend/usecase"
	"go.uber.org/dig"
)

func BuildDigDependencies() (*dig.Container, error) {
	cDig := dig.New()

	registerDependencies(
		cDig,
		infrastructure.NewSQLHandler,
		repository.NewUserRepository,
		repository.NewWorkRepository,
		dataloader.NewDataLoader,
		usecase.NewUserUseCase,
		usecase.NewWorkUseCase,

		resolver.NewResolver,
	)

	return cDig, nil
}

func registerDependencies(c *dig.Container, constructors ...interface{}) {
	for i := 0; i < len(constructors); i++ {
		err := c.Provide(constructors[i])
		if err != nil {
			panic(errors.Wrapf(err, "on #%v/%v elms", i, len(constructors)))
		}
	}
}
