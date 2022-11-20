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
	ID            string          `json:"id"`
	Name          *string         `json:"name"`
	Email         *string         `json:"email"`
	EmailVerified *string       `json:"emailVerified"`
	Image         *string         `json:"image"`
}

func (User) IsNode()            {}
