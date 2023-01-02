package model
type User struct {
	ID            string          `json:"id"`
	Name          *string         `json:"name"`
	Email         *string         `json:"email"`
	EmailVerified []*string       `json:"emailVerified"`
	Image         *string         `json:"image"`
}

func (User) IsNode()            {}
func (this User) GetID() string { return this.ID }
