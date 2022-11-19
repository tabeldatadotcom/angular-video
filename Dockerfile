ARG NGINX_VERSION=mainline

FROM node:16-alpine AS webapp-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:$NGINX_VERSION
# ARG BUILD_FOLDER=--from=webapp-build /app/dist/webapp

ENV APPLICATION_PORT=80
ENV NGINX_ROOT_DOCUMENT=/var/www/html

WORKDIR $NGINX_ROOT_DOCUMENT

LABEL org.framework.name="angular.io"

COPY --from=webapp-build /app/dist/webapp $NGINX_ROOT_DOCUMENT
COPY .nginx/nginx.template.conf /etc/nginx/templates/default.conf.template

EXPOSE ${APPLICATION_PORT}/tcp