FROM node:14
RUN mkdir -p /app
COPY . /app

WORKDIR /app

RUN npm i && npm run build
WORKDIR /app/server
CMD npm i && npm run start
