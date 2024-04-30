PWD=$(shell pwd)
NODE_IMAGE=node:20.12.2
IMAGE_NAME=oca-frontend
CONTAINER_NAME=oca-frontend-app

run-dev:
	npm run dev

run-prod:
	npm run build
	npm run start

docker-run-dev:
	docker run -it -p 3000:3000 --name $(IMAGE_NAME) -w /app -v $(PWD):/app $(NODE_IMAGE) npm run dev

docker-build-prod:
	docker build -t $(IMAGE_NAME) -f Dockerfile .

docker-run-prod:
	docker run --name $(CONTAINER_NAME) -p 3000:3000 -d $(IMAGE_NAME)

docker-logs:
	docker logs -f $(CONTAINER_NAME)

docker-stop:
	docker rm -f $(CONTAINER_NAME)