cp:
	cp ../my-portfolio-backend/graph/schema/*.graphqls ./graphql/schema/
	cat graphql/schema/*.graphqls > graphql/schema.graphql
gen-o:
	yarn run graphql-codegen --config ./graphql/codegen-server.yaml

gen:
	cp ../my-portfolio-backend/graph/*.graphqls ./graphql/schema/
	yarn run graphql-codegen --config ./graphql/codegen-server.yaml
