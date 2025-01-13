build: check-env
	yarn install
	docker compose up -d --force-recreate db_prod
	yarn build:prod
	yarn migrate:prod

run:
	docker compose up -d db_prod
	yarn start:prod
	
build-dev: check-env
	yarn install
	docker compose up -d --force-recreate db_dev
	yarn migrate:dev

run-dev:
	docker compose up -d --force-recreate db_dev
	yarn start:dev

check-env:
	@if [ ! -f ".env" ]; then \
		echo "Error: Can't find the .env file."; \
		echo "If you're using Docker, just rename .env.example to .env"; \
		exit 1; \
	fi