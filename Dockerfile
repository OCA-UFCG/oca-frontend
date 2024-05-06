FROM node:20.12.2

WORKDIR /app

USER node

COPY --chown=node:node . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]