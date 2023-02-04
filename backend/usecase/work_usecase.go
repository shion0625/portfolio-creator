package usecase

import (
	"context"

	"github.com/shion0625/portfolio-creater/backend/domain"
)

type WorkUseCase struct {
	workRepo domain.IWorkRepository
}

// NewWorkUseCase will create new an userUseCase object representation of domain.UserUseCase interface
func NewWorkUseCase(w domain.IWorkRepository) domain.IWorkUseCase {
	return &WorkUseCase{
		workRepo: w,
	}
}

func (w WorkUseCase) GetByID(ctx context.Context, id string) (*domain.Work, error) {
	return w.workRepo.GetByID(ctx, id)
}

func (w WorkUseCase) GetTotalCount(ctx context.Context) (int64, error) {
	return w.workRepo.GetTotalCount(ctx)
}

func (w WorkUseCase) GetAll(ctx context.Context, limit int, offset int) ([]*domain.Work, int64, error) {
	return w.workRepo.GetAll(ctx, limit, offset)
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
