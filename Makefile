PWD=$(shell pwd)
IMAGE_NAME=oca-frontend
CONTAINER_NAME=oca-frontend-app

run-dev:
	npm run dev

run-prod:
	npm run build
	npm run start

docker-build:
	docker build -t $(IMAGE_NAME) .

docker-run-dev:
	docker run --name $(CONTAINER_NAME) -p 3000:3000 -v $(PWD):/app -d $(IMAGE_NAME)

docker-run-prod:
	docker run --name $(CONTAINER_NAME) -p 3000:3000 -d $(IMAGE_NAME)

docker-logs:
	docker logs -f $(CONTAINER_NAME)

docker-stop:
	docker rm -f $(CONTAINER_NAME)