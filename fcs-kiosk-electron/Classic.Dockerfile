FROM node:12-buster as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY app/package.json .
RUN yarn install

ADD app .
RUN yarn build-fe

# production environment
FROM nginx:1.16.1-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
