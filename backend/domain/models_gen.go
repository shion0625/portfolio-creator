// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package domain

import (
	"fmt"
	"io"
	"strconv"
)

type Node interface {
	IsNode()
	GetID() string
}

type Pagination interface {
	IsPagination()
	GetPageInfo() *PaginationInfo
	GetNodes() []Node
}

type CreateWorkInput struct {
	Title          string  `json:"title"`
	Summary        *string `json:"summary"`
	ImageURL       *string `json:"image_url"`
	Duration       *string `json:"duration"`
	NumberOfPeople *int    `json:"number_of_people"`
	Language       *string `json:"language"`
	Role           *string `json:"role"`
	URL            *string `json:"url"`
	BriefStory     *string `json:"brief_story"`
	UserID         string  `json:"user_id"`
}

type PaginationInfo struct {
	Page             int  `json:"page"`
	PaginationLength int  `json:"paginationLength"`
	HasNextPage      bool `json:"hasNextPage"`
	HasPreviousPage  bool `json:"hasPreviousPage"`
	Count            int  `json:"count"`
	TotalCount       int  `json:"totalCount"`
}

type Profile struct {
	ID       string  `json:"id"`
	Birthday *string `json:"birthday"`
	Comment  *string `json:"comment"`
	User     *User   `json:"user"`
}

type UpdateProfileInput struct {
	ID       string  `json:"id"`
	Birthday *string `json:"birthday"`
	Comment  *string `json:"comment"`
}

type UpdateWorkInput struct {
	ID             string  `json:"id"`
	Title          *string `json:"title"`
	Summary        *string `json:"summary"`
	ImageURL       *string `json:"image_url"`
	Duration       *string `json:"duration"`
	NumberOfPeople *int    `json:"number_of_people"`
	Language       *string `json:"language"`
	Role           *string `json:"role"`
	URL            *string `json:"url"`
	BriefStory     *string `json:"brief_story"`
}

type UserPagination struct {
	PageInfo *PaginationInfo `json:"pageInfo"`
	Nodes    []*User         `json:"nodes"`
}

func (UserPagination) IsPagination()                     {}
func (this UserPagination) GetPageInfo() *PaginationInfo { return this.PageInfo }
func (this UserPagination) GetNodes() []Node {
	if this.Nodes == nil {
		return nil
	}
	interfaceSlice := make([]Node, 0, len(this.Nodes))
	for _, concrete := range this.Nodes {
		interfaceSlice = append(interfaceSlice, concrete)
	}
	return interfaceSlice
}

type WorkPagination struct {
	PageInfo *PaginationInfo `json:"pageInfo"`
	Nodes    []*Work         `json:"nodes"`
}

func (WorkPagination) IsPagination()                     {}
func (this WorkPagination) GetPageInfo() *PaginationInfo { return this.PageInfo }
func (this WorkPagination) GetNodes() []Node {
	if this.Nodes == nil {
		return nil
	}
	interfaceSlice := make([]Node, 0, len(this.Nodes))
	for _, concrete := range this.Nodes {
		interfaceSlice = append(interfaceSlice, concrete)
	}
	return interfaceSlice
}

type Role string

const (
	RoleAdmin  Role = "ADMIN"
	RoleUser   Role = "USER"
	RoleViewer Role = "VIEWER"
)

var AllRole = []Role{
	RoleAdmin,
	RoleUser,
	RoleViewer,
}

func (e Role) IsValid() bool {
	switch e {
	case RoleAdmin, RoleUser, RoleViewer:
		return true
	}
	return false
}

func (e Role) String() string {
	return string(e)
}

func (e *Role) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Role(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Role", str)
	}
	return nil
}

func (e Role) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}