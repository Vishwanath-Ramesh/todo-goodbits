FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN yarn install

RUN yarn build

COPY ./dist ./