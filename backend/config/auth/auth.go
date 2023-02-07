package auth

import (
	"context"
	"net/http"
)

type authString string

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")
		if auth == "" {
			next.ServeHTTP(w, r)

			return
		}

		bearer := "Bearer "
		auth = auth[len(bearer):]

		ctxBackground := r.Context()
		validate, err := JwtValidate(ctxBackground, auth)
		if err != nil || !validate.Valid {
			http.Error(w, "Invalid token", http.StatusForbidden)

			return
		}
		customClaim, _ := validate.Claims.(JwtCustomClaim)

		ctx := context.WithValue(r.Context(), authString("auth"), customClaim)

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func CtxValue(ctx context.Context) (JwtCustomClaim, bool) {
	raw, isExist := ctx.Value(authString("auth")).(JwtCustomClaim)

	return raw, isExist
}
