cp:
	cp ./backend/graph/schema/*.graphqls ./frontend/src/libs/graphql/schema/
	cat ./frontend/src/libs/graphql/schema/*.graphqls > ./frontend/src/libs/graphql/schema.graphql

gen:
	@make cp
	@make gen-o

yarn:
	docker-compose exec web yarn

front-dev:
	docker-compose exec web yarn dev

gen-o:
	docker-compose exec web yarn run graphql-codegen --config src/libs/graphql/codegen-server.yaml

server:
	docker compose exec server sh

gqlgen:
	docker compose exec server go run github.com/99designs/gqlgen generate

go-run:
	docker compose exec server air -c .air.toml

go-lint:
	docker compose exec server golangci-lint run

go-lint-fix:
	docker compose exec server golangci-lint run ./... --fix

go-returns:
	docker compose exec server goreturns -w ./**/*.go

go-fix:
	@make go-lint-fix
	@make go-returns

dataload-user:
	docker compose exec server go run github.com/vektah/dataloaden UserLoader string *github.com/shion0625/portfolio-creator/backend/domain.User

dataload-work:
	docker compose exec server go run github.com/vektah/dataloaden WorkLoader string []*github.com/shion0625/portfolio-creator/backend/domain.Work

get:
	docker compose exec server go get github.com/vektah/dataloaden

graphql:
	docker compose exec server go run github.com/99designs/gqlgen

go-gen:
	docker compose exec server go generate ./...

fmt:
	docker compose exec server go fmt ./...

mod-tidy:
	docker compose exec server go mod tidy

db:
	docker compose exec db sh

sql:
	docker compose exec db sh -c 'psql -d portfolio -U shion0625'

migrate:
	@make migrate-user
	@make migrate-server-up

migrate-user:
	docker-compose exec web npx prisma migrate dev
	docker-compose exec web npx prisma generate

migrate-server-up:
	migrate -database postgres://shion0625:Xshion0912@localhost:5432/portfolio?sslmode=disable -path backend/db/migrations up

migrate-server-down:
	migrate -database postgres://shion0625:Xshion0912@localhost:5432/portfolio?sslmode=disable -path backend/db/migrations down

migrate-server-force:
	migrate -database postgres://shion0625:Xshion0912@localhost:5432/portfolio?sslmode=disable -path backend/db/migrations force 3
