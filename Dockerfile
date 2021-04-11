FROM node:alpine as builder

WORKDIR /usr/app

COPY ./package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

FROM nginx

COPY --from=builder /usr/app/dist /usr/share/nginx/html