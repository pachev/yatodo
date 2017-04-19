FROM nginx:1.10.1-alpine

MAINTAINER Pachev Joseph

# For adding user permissions
RUN addgroup -g 1000 -S www-data \
 && adduser -u 1000 -D -S -G www-data www-data

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY dist/ usr/share/nginx/html
