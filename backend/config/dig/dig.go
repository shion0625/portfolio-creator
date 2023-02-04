package dig

import (
	"github.com/pkg/errors"
	"github.com/shion0625/portfolio-creater/backend/graphql/resolver"
	"github.com/shion0625/portfolio-creater/backend/repository"
	"github.com/shion0625/portfolio-creater/backend/usecase"
	"go.uber.org/dig"
	"gorm.io/gorm"
)

func BuildDigDependencies(db *gorm.DB) (*dig.Container, error) {
	c := dig.New()

	registerDependencies(
		c,
		repository.NewUserRepository(db),
		usecase.NewUserUseCase,

		repository.NewWorkRepository(db),
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
