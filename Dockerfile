FROM node:18.19.1 AS build-prisma

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

FROM node:18.17.1 AS build-rest

WORKDIR /app

COPY --from=build-prisma /app /app

RUN npm run build

RUN rm -rf src tsconfig.json README.md .dockerignore docker-compose.yml

EXPOSE 4080

CMD [ "sh", "-c", "NODE_TLS_REJECT_UNAUTHORIZED=0 npx node ./build/src/server.js" ]