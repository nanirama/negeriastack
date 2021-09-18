FROM node:14-alpine

WORKDIR /var/www

RUN apk update && apk upgrade

COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
RUN chown -R node:node /var/www

USER node
EXPOSE 3000

CMD yarn start