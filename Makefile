PWD=$(shell pwd)
NODE_IMAGE=node:20.12.2
IMAGE_NAME=oca-frontend
CONTAINER_PORT=3000

# PROD Env
HOST_PORT_PROD=3000
CONTAINER_NAME_PROD=oca-frontend-app

#BETA Env
HOST_PORT_BETA=6000
CONTAINER_NAME_BETA=oca-frontend-app-beta

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
	docker run --name $(CONTAINER_NAME_PROD) -p $(HOST_PORT_PROD):$(CONTAINER_PORT) -d $(IMAGE_NAME)

docker-run-beta:
	docker run --name $(CONTAINER_NAME_BETA) -p $(HOST_PORT_BETA):$(CONTAINER_PORT) -d $(IMAGE_NAME):latest

docker-logs:
	docker logs -f $(CONTAINER_NAME)

docker-stop:
	docker rm -f $(CONTAINER_NAME)