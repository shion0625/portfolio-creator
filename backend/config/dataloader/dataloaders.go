package dataloader

import (
	"time"

	"github.com/shion0625/portfolio-creator/backend/domain"
)

var (
	wait = 2 * time.Millisecond
	maxBatch = 100
)

type IDataLoader interface {
	UsersByIDs() *UserLoader
	WorksByIDs() *WorkLoader
}

type DataLoader struct {
	userRepo domain.IUserRepository
	workRepo domain.IWorkRepository
}

func NewDataLoader(u domain.IUserRepository, w domain.IWorkRepository) IDataLoader {
	return &DataLoader{
		userRepo: u,
		workRepo: w,
	}
}

func (d DataLoader) UsersByIDs() *UserLoader {
	userLoader := NewUserLoader(UserLoaderConfig{
		MaxBatch: maxBatch,                  // 溜める最大数、0を指定すると制限無し
		Wait:     wait, // 溜める時間
		Fetch: func(ids []string) ([]*domain.User, []error) {
			users := make([]*domain.User, 0, len(ids))
			errors := make([]error, 0, len(ids))

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

func (d DataLoader) WorksByIDs() *WorkLoader {
	workLoader := NewWorkLoader(WorkLoaderConfig{
		MaxBatch: maxBatch,                  // 溜める最大数、0を指定すると制限無し
		Wait:     wait, // 溜める時間
		Fetch: func(ids []string) ([][]*domain.Work, []error) {
			works := make([][]*domain.Work, 0, len(ids))
			errors := make([]error, 0, len(ids))

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
