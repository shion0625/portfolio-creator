//go:build tools
// +build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/cosmtrek/air"
	_ "github.com/golangci/golangci-lint/cmd/golangci-lint"
	// - "github.com/sqs/goreturns"
	// _ "github.com/vektah/dataloaden"
)
