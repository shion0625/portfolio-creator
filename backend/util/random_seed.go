package util

import (
	cryptorand "crypto/rand"
	"encoding/binary"
	"math/rand"
)

// 予測困難なシードで math/rand を初期化。
func InitRandomSeed() {
	var seed int64
	if err := binary.Read(cryptorand.Reader, binary.LittleEndian, &seed); err != nil {
		panic(err)
	}

	rand.Seed(seed)
}
