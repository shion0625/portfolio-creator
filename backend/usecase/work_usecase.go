package usecase

import (
	"context"
	"math"

	"github.com/shion0625/portfolio-creator/backend/config/dataloader"
	"github.com/shion0625/portfolio-creator/backend/domain"
)

type WorkUseCase struct {
	workRepo   domain.IWorkRepository
	workLoader dataloader.IDataLoader
}

// NewWorkUseCase will create new an userUseCase object representation of domain.UserUseCase interface
func NewWorkUseCase(w domain.IWorkRepository, wl dataloader.IDataLoader) domain.IWorkUseCase {
	return &WorkUseCase{
		workRepo:   w,
		workLoader: wl,
	}
}

func (w WorkUseCase) GetByID(ctx context.Context, id string) (*domain.Work, error) {
	return w.workRepo.GetByID(ctx, id)
}

func (w WorkUseCase) GetAll(ctx context.Context, limit int, offset int) (*domain.WorkPagination, error) {
	totalCount, err := w.workRepo.GetTotalCount(ctx)
	if err != nil {
		return nil, err
	}

	works, numRows, err := w.workRepo.GetAll(ctx, limit, offset)
	if err != nil {
		return nil, err
	}

	pageInfo := domain.PaginationInfo{
		Page:             int(math.Ceil(float64(offset) / float64(limit))),
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      (int(totalCount) < limit+offset),
		HasPreviousPage:  limit < offset,
		Count:            int(numRows),
		TotalCount:       int(totalCount),
	}
	workPagination := domain.WorkPagination{
		PageInfo: &pageInfo,
		Nodes:    works,
	}
	return &workPagination, nil
}

func (w WorkUseCase) GetAllLoad(ctx context.Context, id string) (*domain.WorkPagination, error) {
	works, err := w.workLoader.WorksByIDs().Load(id)
	pageInfo := domain.PaginationInfo{
		Page:             1,
		PaginationLength: 1,
		HasNextPage:      false,
		HasPreviousPage:  false,
		Count:            len(works),
		TotalCount:       len(works),
	}
	workPagination := domain.WorkPagination{
		PageInfo: &pageInfo,
		Nodes:    works,
	}
	return &workPagination, err
}

func (w WorkUseCase) Create(ctx context.Context, input domain.CreateWorkInput) error {
	return w.workRepo.Create(ctx, input)
}

func (w WorkUseCase) Update(ctx context.Context, work *domain.Work, input domain.UpdateWorkInput) error {
	return w.workRepo.Update(ctx, work, input)
}

func (w WorkUseCase) Delete(ctx context.Context, ids []*string) error {
	return w.workRepo.Delete(ctx, ids)
}
