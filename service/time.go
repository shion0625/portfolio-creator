package service
import (
	"time"
)
	// レシーバーtを、"YYYY-MM-DDTHH-MM-SSZZZZ"という形の文字列に変換する
func Time2str(t time.Time) string {

	return t.Format("2006-01-02T15:04:05Z07:00")
}
