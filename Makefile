PWD=$(shell pwd)
NODE_IMAGE=node:20.12.2
IMAGE_NAME=oca-frontend
CONTAINER_NAME=oca-frontend-app
HOST_PORT=3000
CONTAINER_PORT=3000

run-dev:
	npm run dev

run-prod:
	npm run build
	npm run start

docker-run-dev:
	docker run -p $(HOST_PORT):$(CONTAINER_PORT) --name $(IMAGE_NAME) -v node_modules -v $(PWD):/app $(IMAGE_NAME)

docker-build-prod:
	docker build -t $(IMAGE_NAME) -f Dockerfile.production .

docker-run-prod:
	docker run --name $(CONTAINER_NAME) -p $(HOST_PORT):$(CONTAINER_PORT) -d $(IMAGE_NAME)

docker-logs:
	docker logs -f $(CONTAINER_NAME)

docker-stop:
	docker rm -f $(CONTAINER_NAME)