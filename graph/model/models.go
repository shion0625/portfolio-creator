package model

type Work struct {
	ID             string  `json:"id"`
	Title          string  `json:"title"`
	Summary        *string `json:"summary"`
	ImageURL       *string `json:"image_url"`
	Duration       *string `json:"duration"`
	NumberOfPeople *int    `json:"number_of_people"`
	Language       *string `json:"language"`
	Role           *string `json:"role"`
	URL            *string  `json:"url"`
	BriefStory     *string `json:"brief_story"`
	UserID         string   `json:"user"`
}

func (Work) IsNode() {}

type User struct {
	ID       string          `json:"id"`
	IsAdmin  bool            `json:"is_admin"`
	Name     string          `json:"name"`
	Password string          `json:"password"`
	Email    string          `json:"email"`
	IsAble   bool            `json:"is_able"`
}

func (User) IsNode()            {}
