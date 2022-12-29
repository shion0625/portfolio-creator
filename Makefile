cp:
	cp ./backend/graph/schema/*.graphqls ./frontend/graphql/schema/
	cat ./frontend/graphql/schema/*.graphqls > ./frontend/graphql/schema.graphql

gen-o:
	yarn run graphql-codegen --config ./frontend/graphql/codegen-server.yaml

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
migrate-user:
	npx prisma migrate dev
migrate-up:
	migrate -database postgres://shion0625:Xshion0912@localhost:5432/portfolio?sslmode=disable -path backend/db/migrations up
migrate-down:
	migrate -database postgres://shion0625:Xshion0912@localhost:5432/portfolio?sslmode=disable -path backend/db/migrations down
migrate-force:
	migrate -database postgres://shion0625:Xshion0912@localhost:5432/portfolio?sslmode=disable -path backend/db/migrations force 3
graphql:
	go run github.com/99designs/gqlgen
gen:
	go generate ./...
fmt:
	go fmt ./**/*.go
