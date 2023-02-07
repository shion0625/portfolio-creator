package auth

import (
	"context"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var threeDays = time.Hour * 72

type JwtCustomClaim struct {
	ID string `json:"id"`
	jwt.StandardClaims
}

var jwtSecret = []byte(getJwtSecret())

func getJwtSecret() string {
	secret := os.Getenv("TOKEN_KEY")
	if secret == "" {
		return "asSecret"
	}

	return secret
}

func JwtGenerate(ctx context.Context, userID string) (string, error) {
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, &JwtCustomClaim{
		ID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(threeDays).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	})
	token, err := t.SignedString(jwtSecret)

	if !errors.Is(err, nil) {
		return "", fmt.Errorf("signedString:%w", err)
	}

	return token, nil
}

func JwtValidate(ctx context.Context, token string) (*jwt.Token, error) {
	jwtToken, err := jwt.ParseWithClaims(token, &JwtCustomClaim{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("there's a problem with the signing method %t", ok)
		}

		return jwtSecret, nil
	})

	return jwtToken, fmt.Errorf("JwtValidate: %w", err)
}
