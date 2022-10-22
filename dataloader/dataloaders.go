package dataloader

import(
	"time"
	"github.com/shion0625/my-portfolio-backend/graph/model"
  "gorm.io/gorm"
)

func UsersByIDs(db *gorm.DB) *UserLoader{
	userLoader := NewUserLoader(UserLoaderConfig{
		MaxBatch: 100, // 溜める最大数、0を指定すると制限無し
		Wait:     2 * time.Millisecond, // 溜める時間
		Fetch: func(ids []string) ([]*model.User, []error) {
			users := make([]*model.User, len(ids))
			errors := make([]error, len(ids))

			db.Debug().Where("id IN ?", ids).Find(&users)

			// 引数のidsに対応する順番の配列で返す。
			return users, errors
		},
	})
	return userLoader
}

func WorksByIDs(db *gorm.DB) *WorkLoader{
	workLoader := NewWorkLoader(WorkLoaderConfig{
		MaxBatch: 100, // 溜める最大数、0を指定すると制限無し
		Wait:     2 * time.Millisecond, // 溜める時間
		Fetch: func(ids []string) ([][]*model.Work, []error) {
			works := make([][]*model.Work, len(ids))
			errors := make([]error, len(ids))
			var workTemp []*model.Work
			db.Debug().Where("user_id IN ?", ids).Find(&workTemp)

			workByUserId := map[string][]*model.Work{}
				for _, work := range workTemp {
						workByUserId[work.UserID] = append(workByUserId[work.UserID], work)
				}

				for i, id := range ids {
						works[i] = workByUserId[id]
				}

			// 引数のidsに対応する順番の配列で返す。
			return works , errors
		},
	})
	return workLoader
}
