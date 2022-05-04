FROM node:16-alpine

WORKDIR /usr/src/app

COPY /backend .
COPY /frontend/dist/super-koch /usr/src/app/public

RUN yarn

EXPOSE 8080

CMD [ "yarn", "start" ]