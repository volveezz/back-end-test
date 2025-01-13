run-dev:
	docker compose up -d --force-recreate db_dev
	yarn start:dev cross-env POSTGRES_DB=dev

build:
	docker compose up -d --force-recreate db_prod
	yarn build:prod
	yarn migrate:prod

run:
	docker compose up -d db_prod
	yarn start:prod cross-env POSTGRES_DB=prod