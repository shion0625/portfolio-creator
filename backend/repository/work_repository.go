package repository

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/shion0625/portfolio-creator/backend/domain"
	"github.com/shion0625/portfolio-creator/backend/infrastructure"
	"github.com/shion0625/portfolio-creator/backend/util"
)

type WorkRepository struct {
	db *infrastructure.SQLHandler
}

func NewWorkRepository(db *infrastructure.SQLHandler) domain.IWorkRepository {
	return &WorkRepository{db}
}

func (g *WorkRepository) GetByID(ctx context.Context, id string) (*domain.Work, error) {
	var work domain.Work
	if err := g.db.Conn.Where("id = ?", id).First(&work).Error; !errors.Is(err, nil) {
		return nil, fmt.Errorf("GetByID - repository: %w", err)
	}

	return &work, nil
}

func (g *WorkRepository) GetTotalCount(ctx context.Context) (int64, error) {
	var totalCount int64
	if err := g.db.Conn.Table("works").Where("is_delete = ?", "False").Count(&totalCount).Error; err != nil {
		return 0, fmt.Errorf("GetTotalCount - repository: %w", err)
	}

	return totalCount, nil
}

func (g *WorkRepository) GetAll(ctx context.Context, limit int, order string, searched string, num int) ([]*domain.Work, int64, error) {
	var works []*domain.Work
	result := g.db.Conn.Debug().Limit(limit).
		Joins("INNER JOIN users on users.id = works.user_id").Scopes(util.SortWork(order, searched, num)).Find(&works)

	if !errors.Is(result.Error, nil) {
		return nil, 0, result.Error
	}

	return works, result.RowsAffected, nil
}

func (g *WorkRepository) GetByUserIDs(ids []string) ([]*domain.Work, error) {
	var works []*domain.Work
	if err := g.db.Conn.Debug().Where("user_id IN ?", ids).Take(&works).Error; !errors.Is(err, nil) {
		return nil, fmt.Errorf("GetByUserIDs - repository: %w", err)
	}

	return works, nil
}

func (g *WorkRepository) GetByKeyword(ctx context.Context, keyword string, limit int, offset int) ([]*domain.Work, int64, error) {
	var works []*domain.Work

	keywords := strings.Fields(keyword)
	columns := [...]string{"title", "summary", "duration", "language", "role", "brief_story"}

	var WhereQuery string

	for i, column := range columns {
		for j, keyword := range keywords {
			WhereQuery += fmt.Sprintf("%s LIKE '%%%s%%'", column, keyword)
			if i != len(columns)-1 || j != len(keywords)-1 {
				WhereQuery += " OR "
			}
		}
	}

	result := g.db.Conn.Debug().Limit(limit).Offset(offset).Where(WhereQuery).Find(&works)

	if err := result.Error; !errors.Is(err, nil) {
		return nil, 0, fmt.Errorf("GetByKeyword - repository: %w", err)
	}

	return works, result.RowsAffected, nil
}

func (g *WorkRepository) Create(ctx context.Context, input domain.CreateWorkInput) error {
	for i := 0; i < 5; i++ {
		uuidWithHyphen := uuid.New()
		uuid := strings.ReplaceAll(uuidWithHyphen.String(), "-", "")
		work := domain.Work{
			ID: uuid,
			// Title:          input.Title,
			Title:          strconv.Itoa(i),
			Summary:        input.Summary,
			ImageURL:       input.ImageURL,
			Duration:       input.Duration,
			NumberOfPeople: input.NumberOfPeople,
			Language:       input.Language,
			Role:           input.Role,
			URL:            input.URL,
			BriefStory:     input.BriefStory,
			CreatedAt:      util.Time2str(time.Now()),
			UpdatedAt:      util.Time2str(time.Now()),
			UserID:         input.UserID,
		}

		if err := g.db.Conn.Debug().Create(&work).Error; !errors.Is(err, nil) {
			return fmt.Errorf("Create - repository: %w", err)
		}
		time.Sleep(time.Second * 1)
	}

	return nil
}

func (g *WorkRepository) Update(ctx context.Context, work *domain.Work, input domain.UpdateWorkInput) error {
	if err := g.db.Conn.Model(work).Updates(domain.Work{
		Title:          *input.Title,
		Summary:        input.Summary,
		ImageURL:       input.ImageURL,
		Duration:       input.Duration,
		NumberOfPeople: input.NumberOfPeople,
		Language:       input.Language,
		Role:           input.Role,
		URL:            input.URL,
		BriefStory:     input.BriefStory,
		UpdatedAt:      util.Time2str(time.Now()),
	}).Error; !errors.Is(err, nil) {
		return fmt.Errorf("Update - repository: %w", err)
	}

	return nil
}

func (g *WorkRepository) Delete(ctx context.Context, ids []*string) error {
	if err := g.db.Conn.Model(domain.Work{}).Where("id IN ?", ids).Updates(domain.Work{
		IsDelete:  true,
		UpdatedAt: util.Time2str(time.Now()),
	}).Error; !errors.Is(err, nil) {
		return fmt.Errorf("Delete - repository: %w", err)
	}

	return nil
}
