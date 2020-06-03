FROM node:10.16.0-alpine

WORKDIR /app

ARG NPM_TOKEN
ARG GITHUB_TOKEN
COPY ops/.npmrc .

RUN apk add --no-cache npm git jq
COPY ./ /app
RUN yarn
