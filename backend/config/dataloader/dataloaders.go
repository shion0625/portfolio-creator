package dataloader

import (
	"log"
	"time"

	"github.com/shion0625/portfolio-creator/backend/domain"
)

var (
	wait     = 2 * time.Millisecond
	maxBatch = 100
)

type IDataLoaderUseCase interface {
	UsersByIDs() *UserLoader
	WorksByIDs() *WorkLoader
}

type DataLoaderUseCase struct {
	userRepo domain.IUserRepository
	workRepo domain.IWorkRepository
}

func NewDataLoader(u domain.IUserRepository, w domain.IWorkRepository) IDataLoaderUseCase {
	return &DataLoaderUseCase{
		userRepo: u,
		workRepo: w,
	}
}

func (d DataLoaderUseCase) UsersByIDs() *UserLoader {
	userLoader := NewUserLoader(UserLoaderConfig{
		MaxBatch: maxBatch, // 溜める最大数、0を指定すると制限無し
		Wait:     wait,     // 溜める時間
		Fetch: func(ids []string) ([]*domain.User, []error) {
			users := make([]*domain.User, len(ids))
			errors := make([]error, len(ids))
			usersTemp, err := d.userRepo.GetByIDs(ids)
			if err != nil {
				errors = append(errors, err)
			}

			userByIDs := map[string]*domain.User{}
			for _, user := range usersTemp {
				userByIDs[user.ID] = user
			}

			for i, id := range ids {
				users[i] = userByIDs[id]
			}

			// 引数のidsに対応する順番の配列で返す。
			return users, errors
		},
	})

	return userLoader
}

func (d DataLoaderUseCase) WorksByIDs() *WorkLoader {
	workLoader := NewWorkLoader(WorkLoaderConfig{
		MaxBatch: maxBatch, // 溜める最大数、0を指定すると制限無し
		Wait:     wait,     // 溜める時間
		Fetch: func(ids []string) ([][]*domain.Work, []error) {
			works := make([][]*domain.Work, len(ids))
			errors := make([]error, len(ids))
			log.Print("works :%w", works)

			worksTemp, err := d.workRepo.GetByUserIDs(ids)
			if err != nil {
				errors = append(errors, err)
			}

			workByUserIDs := map[string][]*domain.Work{}
			for _, work := range worksTemp {
				workByUserIDs[work.UserID] = append(workByUserIDs[work.UserID], work)
			}

			for i, id := range ids {
				works[i] = workByUserIDs[id]
			}

			// 引数のidsに対応する順番の配列で返す。
			return works, errors
		},
	})

	return workLoader
}
