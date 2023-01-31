cp:
	cp ./backend/graph/schema/*.graphqls ./frontend/graphql/schema/
	cat ./frontend/graphql/schema/*.graphqls > ./frontend/graphql/schema.graphql

gen:
	@make cp
	@make gen-o

yarn:
	docker-compose exec web yarn

front-dev:
	docker-compose exec web yarn dev

gen-o:
	docker-compose exec web yarn run graphql-codegen --config graphql/codegen-server.yaml

server:
	docker compose exec server sh

gqlgen:
	docker compose exec server go run github.com/99designs/gqlgen generate

server-run:
	docker compose exec server go run server.go

graphql:
	docker compose exec server go run github.com/99designs/gqlgen

go-gen:
	docker compose exec server go generate ./...

fmt:
	docker compose exec server go fmt ./...

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
