package usecase

import (
	"context"
	"errors"
	"fmt"
	"math"

	"github.com/shion0625/portfolio-creator/backend/domain"
)

type WorkUseCase struct {
	// Work's repository interface.
	workRepo domain.IWorkRepository
}

// NewWorkUseCase will create new an userUseCase object representation of domain.UserUseCase interface.
func NewWorkUseCase(w domain.IWorkRepository) domain.IWorkUseCase {
	return &WorkUseCase{
		workRepo: w,
	}
}

/*
GetByID is based on the entered id and retrieves information about the user matching that id.
Returns the domain.Work structure if the user specified in the argument is in the database, or nil otherwise.
If an unexpected error occurs, the error wrapped in GetByID-usecase: is returned.
*/
func (w WorkUseCase) GetByID(ctx context.Context, id string) (*domain.Work, error) {
	work, err := w.workRepo.GetByID(ctx, id)

	return work, fmt.Errorf("GetByID - usecase: %w", err)
}

/*
GetAll retrieves information for multiple users based on the limit and offset entered.
The limit is the number of data to retrieve.
The offset is the number of data to start retrieving.
It returns a domain.UserPagination structure if the user specified in the argument exists in the database, or nil otherwise.
If an unexpected error occurs, an error wrapped in GetAll-usecase or GetAll - GetTotalCount - usecase: is returned.
*/
func (w WorkUseCase) GetAll(ctx context.Context, limit int, order string, searched string, num int) (*domain.WorkPagination, error) {
	totalCount, err := w.workRepo.GetTotalCount(ctx)
	if err != nil {
		return nil, fmt.Errorf("GetAll - GetTotalCount - usecase: %w", err)
	}

	works, numRows, err := w.workRepo.GetAll(ctx, limit, order, searched, num)
	if err != nil {
		return nil, fmt.Errorf("GetAll - usecase: %w", err)
	}

	pageInfo := domain.PaginationInfo{
		Page:             0,
		PaginationLength: int(math.Ceil(float64(totalCount) / float64(limit))),
		HasNextPage:      false,
		HasPreviousPage:  false,
		Count:            int(numRows),
		TotalCount:       int(totalCount),
	}
	workPagination := domain.WorkPagination{
		PageInfo: &pageInfo,
		Nodes:    works,
	}

	return &workPagination, nil
}

/*
GetAllNodes retrieves information for multiple users based on the limit and offset entered.
The limit is the number of data to retrieve.
The offset is the number of data to start retrieving.
It returns a []*domain.Work if the user specified in the argument exists in the database, or nil otherwise.
If an unexpected error occurs, an error wrapped in GetAllNodes-usecase: is returned.
*/
func (w WorkUseCase) GetAllNodes(ctx context.Context, limit int, order string, searched string, num int) ([]*domain.Work, error) {
	works, _, err := w.workRepo.GetAll(ctx, limit, order, searched, num)
	if err != nil {
		return nil, fmt.Errorf("GetAllNodes - usecase: %w", err)
	}

	return works, nil
}

/*
Search retrieves information for multiple users based on the limit and offset entered.
The keyword is the string of data to retrieve.
The limit is the number of data to retrieve.
The offset is the number of data to start retrieving.
It returns a domain.UserPagination structure if the user specified in the argument exists in the database, or nil otherwise.
If an unexpected error occurs, an error wrapped in Search-usecase: is returned.
*/
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

/*
Create gets an input based on the format domain.CreateWorkInput and creates a work.
The input is the domain.CreateWorkInput of data to retrieve.
If an unexpected error occurs, an error wrapped in Create - usecase: is returned.
*/
func (w WorkUseCase) Create(ctx context.Context, input domain.CreateWorkInput) error {
	if err := w.workRepo.Create(ctx, input); !errors.Is(err, nil) {
		return fmt.Errorf("Create - usecase: %w", err)
	}

	return nil
}

/*
Update gets work you want to change, input based on the format domain.CreateWorkInput and update a work.
The work is the domain.Work of data to retrieve.
The input is the domain.CreateWorkInput of data to retrieve.
If an unexpected error occurs, an error wrapped in Update - usecase: is returned.
*/
func (w WorkUseCase) Update(ctx context.Context, work *domain.Work, input domain.UpdateWorkInput) error {
	if err := w.workRepo.Update(ctx, work, input); !errors.Is(err, nil) {
		return fmt.Errorf("Update - usecase: %w", err)
	}

	return nil
}

/*
Delete is a logical deletion from the database by selecting multiple ids to be erased.
The ids is the []*string of data to retrieve.
If an unexpected error occurs, an error wrapped in Delete - usecase: is returned.
*/
func (w WorkUseCase) Delete(ctx context.Context, ids []*string) error {
	if err := w.workRepo.Delete(ctx, ids); !errors.Is(err, nil) {
		return fmt.Errorf("Delete - usecase: %w", err)
	}

	return nil
}
