cp:
	cp ../my-portfolio-backend/graph/schema/*.graphqls ./graphql/schema/
	cat graphql/schema/*.graphqls > graphql/schema.graphql

gen-o:
	yarn run graphql-codegen --config ./graphql/codegen-server.yaml

gen:
	@make cp
	@make gen-o
gqlgen:
	go run github.com/99designs/gqlgen generate
run:
	go run server.go
db:
	docker compose exec db sh
sql:
	docker compose exec db sh -c 'psql -d portfolio -U shion0625'
server:
	docker compose exec server sh
migrate-up:
	migrate -database postgres://shion0625:Xshion0912@localhost:5432/portfolio?sslmode=disable -path db/migrations up
migrate-down:
	migrate -database postgres://shion0625:Xshion0912@localhost:5432/portfolio?sslmode=disable -path db/migrations down
migrate-force:
	migrate -database postgres://shion0625:Xshion0912@localhost:5432/portfolio?sslmode=disable -path db/migrations force 3
graphql:
	go run github.com/99designs/gqlgen
gen:
	go generate ./...
fmt:
	go fmt ./**/*.go
