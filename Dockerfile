# frontend/Dockerfile
FROM node:18-alpine

RUN apk add --no-cache git python3 make g++ && \
    npm install -g yarn esbuild@0.21.5 --force

WORKDIR /app

COPY package*.json ./
RUN yarn install --frozen-lockfile --ignore-engines && \
    yarn add esbuild@0.21.5 --exact

COPY . .

RUN yarn add esbuild@0.21.5 --exact --dev

EXPOSE 3000
CMD ["yarn", "dev"]