FROM node:14.13.1-alpine3.12 as app

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.13.8-alpine

COPY --from=app /app/dist /var/www/fe
COPY nginx/nginx.conf /etc/nginx/nginx.conf
