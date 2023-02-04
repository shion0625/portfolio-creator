package dig

import (
	"github.com/pkg/errors"
	"github.com/shion0625/portfolio-creater/backend/graphql/resolver"
	"github.com/shion0625/portfolio-creater/backend/infrastructure"
	"github.com/shion0625/portfolio-creater/backend/repository"
	"github.com/shion0625/portfolio-creater/backend/usecase"
	"go.uber.org/dig"
)

func BuildDigDependencies() (*dig.Container, error) {
	c := dig.New()

	registerDependencies(
		c,
		infrastructure.NewSQLHandler,
		repository.NewUserRepository,
		usecase.NewUserUseCase,

		repository.NewWorkRepository,
		usecase.NewWorkUseCase,

		resolver.NewResolver,
	)

	return c, nil
}

func registerDependencies(c *dig.Container, constructors ...interface{}) {
	for i := 0; i < len(constructors); i++ {
		err := c.Provide(constructors[i])
		if err != nil {
			panic(errors.Wrapf(err, "On #%v/%v elms:", i, len(constructors)))
		}
	}
}
