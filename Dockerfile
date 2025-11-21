# frontend/Dockerfile
FROM node:22-alpine

RUN apk add --no-cache git python3 make g++

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-engines

COPY . .

EXPOSE 3000
CMD ["yarn", "build"]