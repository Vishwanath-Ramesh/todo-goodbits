FROM node:alpine as builder

WORKDIR /usr/app

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

COPY ./dist ${TRAVIS_BUILD_DIR}