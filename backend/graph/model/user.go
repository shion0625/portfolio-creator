package model
type User struct {
	ID            string          `json:"id" gorm:"type:text"`
	Name          *string         `json:"name" gorm:"type:text"`
	Email         *string         `json:"email" gorm:"type:text"`
	EmailVerified []*string       `json:"emailVerified" gorm:"type:text[]"`
	Image         *string         `json:"image" gorm:"type:text"`
}

func (User) IsNode()            {}
func (this User) GetID() string { return this.ID }
