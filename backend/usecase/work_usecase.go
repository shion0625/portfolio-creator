package usecase

import (
	"context"
	"fmt"
	"math"

	"github.com/shion0625/portfolio-creator/backend/config/dataloader"
	"github.com/shion0625/portfolio-creator/backend/domain"
)

type WorkUseCase struct {
	workRepo   domain.IWorkRepository
	workLoader dataloader.IDataLoader
}

// NewWorkUseCase will create new an userUseCase object representation of domain.UserUseCase interface.
func NewWorkUseCase(w domain.IWorkRepository, wl dataloader.IDataLoader) domain.IWorkUseCase {
	return &WorkUseCase{
		workRepo:   w,
		workLoader: wl,
	}
}

func (w WorkUseCase) GetByID(ctx context.Context, id string) (*domain.Work, error) {
	work, err := w.workRepo.GetByID(ctx, id)

	return work, fmt.Errorf("GetByID - usecase: %w", err)
}

func (w WorkUseCase) GetAll(ctx context.Context, limit int, offset int) (*domain.WorkPagination, error) {
	totalCount, err := w.workRepo.GetTotalCount(ctx)
	if err != nil {
		return nil, fmt.Errorf("GetAll - GetTotalCount - usecase: %w", err)
	}

	works, numRows, err := w.workRepo.GetAll(ctx, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("GetAll - usecase: %w", err)
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

func (w WorkUseCase) GetAllNodes(ctx context.Context, limit int, offset int) ([]*domain.Work, error) {
	works, _, err := w.workRepo.GetAll(ctx, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("GetAllNodes - usecase: %w", err)
	}

	return works, nil
}

func (w WorkUseCase) GetAllLoad(ctx context.Context, id string) (*domain.WorkPagination, error) {
	works, err := w.workLoader.WorksByIDs().Load(id)
	if err != nil {
		return nil, fmt.Errorf("GetAllLoad - usecase: %w", err)
	}

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

	return &workPagination, nil
}

func (w WorkUseCase) Search(ctx context.Context, keyword string, limit int, offset int) (*domain.WorkPagination, error) {
	works, numRows, err := w.workRepo.GetByKeyword(ctx, keyword, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("Search - usecase: %w", err)
	}

	pageInfo := domain.PaginationInfo{
		Page:             int(math.Ceil(float64(offset) / float64(limit))),
		PaginationLength: int(math.Ceil(float64(numRows) / float64(limit))),
		HasNextPage:      (int(numRows) < limit+offset),
		HasPreviousPage:  limit < offset,
		Count:            int(numRows),
		TotalCount:       int(numRows),
	}
	workPagination := domain.WorkPagination{
		PageInfo: &pageInfo,
		Nodes:    works,
	}

	return &workPagination, nil
}

func (w WorkUseCase) Create(ctx context.Context, input domain.CreateWorkInput) error {
	err := w.workRepo.Create(ctx, input)

	return fmt.Errorf("Create - usecase: %w", err)
}

func (w WorkUseCase) Update(ctx context.Context, work *domain.Work, input domain.UpdateWorkInput) error {
	err := w.workRepo.Update(ctx, work, input)

	return fmt.Errorf("Update - usecase: %w", err)
}

func (w WorkUseCase) Delete(ctx context.Context, ids []*string) error {
	err := w.workRepo.Delete(ctx, ids)

	return fmt.Errorf("Delete - usecase: %w", err)
}
