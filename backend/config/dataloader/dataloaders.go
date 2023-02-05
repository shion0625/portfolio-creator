package dataloader

import (
	"time"

	"github.com/shion0625/portfolio-creater/backend/domain"
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
		MaxBatch: 100,                  // 溜める最大数、0を指定すると制限無し
		Wait:     2 * time.Millisecond, // 溜める時間
		Fetch: func(ids []string) ([]*domain.User, []error) {
			users := make([]*domain.User, len(ids))
			errors := make([]error, len(ids))

			usersTemp, err := d.userRepo.GetByIDs(ids)
			if err != nil {
				errors = append(errors, err)
			}

			userById := map[string]*domain.User{}
			for _, user := range usersTemp {
				userById[user.ID] = user
			}

			for i, id := range ids {
				users[i] = userById[id]
			}

			// 引数のidsに対応する順番の配列で返す。
			return users, errors
		},
	})
	return userLoader
}

func (d DataLoader) WorksByIDs() *WorkLoader {
	workLoader := NewWorkLoader(WorkLoaderConfig{
		MaxBatch: 100,                  // 溜める最大数、0を指定すると制限無し
		Wait:     2 * time.Millisecond, // 溜める時間
		Fetch: func(ids []string) ([][]*domain.Work, []error) {
			works := make([][]*domain.Work, len(ids))
			errors := make([]error, len(ids))

			worksTemp, err := d.workRepo.GetByUserIDs(ids)
			if err != nil {
				errors = append(errors, err)
			}

			workByUserId := map[string][]*domain.Work{}
			for _, work := range worksTemp {
				workByUserId[work.UserID] = append(workByUserId[work.UserID], work)
			}

			for i, id := range ids {
				works[i] = workByUserId[id]
			}

			// 引数のidsに対応する順番の配列で返す。
			return works, errors
		},
	})
	return workLoader
}
