FROM node:22-alpine AS build
WORKDIR /app
ARG APP_ORIGIN=https://localhost
ENV APP_ORIGIN=$APP_ORIGIN

COPY package.json bun.lock ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
