cp:
	cp ../my-portfolio-backend/graph/*.graphqls ./graphql/schema/

gen-o:
	yarn run graphql-codegen --config ./graphql/codegen-server.yaml

gen:
	cp ../my-portfolio-backend/graph/*.graphqls ./graphql/schema/
	yarn run graphql-codegen --config ./graphql/codegen-server.yaml
