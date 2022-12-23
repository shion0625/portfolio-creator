cp:
	cp ../my-portfolio-backend/graph/schema/*.graphqls ./graphql/schema/
	cat graphql/schema/*.graphqls > graphql/schema.graphql

gen-o:
	yarn run graphql-codegen --config ./graphql/codegen-server.yaml

gen:
	@make cp
	@make gen-o
