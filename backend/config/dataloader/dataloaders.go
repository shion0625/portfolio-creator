package dataloader

import (
	"time"

	"github.com/shion0625/portfolio-creater/backend/domain"
	"gorm.io/gorm"
)

type IUserLoader interface {
	Load(key string) (*domain.User, error)
}

type IWorkLoader interface {
	Load(key string) ([]*domain.Work, error)
}

func UsersByIDs(db *gorm.DB) *UserLoader {
	userLoader := NewUserLoader(UserLoaderConfig{
		MaxBatch: 100,                  // 溜める最大数、0を指定すると制限無し
		Wait:     2 * time.Millisecond, // 溜める時間
		Fetch: func(ids []string) ([]*domain.User, []error) {
			users := make([]*domain.User, len(ids))
			errors := make([]error, len(ids))

			var usersTemp []*domain.User

			db.Debug().Table("users").Where("id IN ?", ids).Find(&usersTemp)

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

func WorksByIDs(db *gorm.DB) *WorkLoader {
	workLoader := NewWorkLoader(WorkLoaderConfig{
		MaxBatch: 100,                  // 溜める最大数、0を指定すると制限無し
		Wait:     2 * time.Millisecond, // 溜める時間
		Fetch: func(ids []string) ([][]*domain.Work, []error) {
			works := make([][]*domain.Work, len(ids))
			errors := make([]error, len(ids))
			var worksTemp []*domain.Work
			db.Debug().Where("user_id IN ?", ids).Find(&worksTemp)

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
