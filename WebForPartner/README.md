## Docker

``` bash

$ sudo docker build -t fcspartner . # run command in this folder
$ sudo docker run -d --restart always -p 6969:80 -it fcspartner # test with http://webserver:6969

```

## Setup base source

``` bash

$ cp .env.example .env # create .env file from example

```

## Setup with yarn

``` bash

## Install dependencies
$ yarn # will install node_modules in this folder
$ yarn add global gulp # will install in yarn's global modules for below command (skip if already installed)
$ yarn add global pm2 # will install in yarn's global modules for below command (skip if already installed, and only use for production)

## For development
$ yarn dev # serve with hot reload SCSS & Next.JS change at http://localhost:3000

## For production
$ yarn gulp build # generate CSS file for web
$ yarn build # build .next for production
$ yarn pm2 start next start # host for SSR, must setting proxy-pass on host service with http://localhost:3000 (Apache: https://httpd.apache.org/docs/2.4/mod/mod_proxy.html, Nginx: https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/). Note: ignore the error, it worked fine.
$ yarn pm2 list # check pm2 commands status

```

## Setup with npm

``` bash

## Install dependencies
$ npm i # will install node_modules in this folder
$ npm i gulp -g # will install in device's node_modules for below command (skip if already installed)
$ npm i pm2 -g # will install in device's node_modules for below command (skip if already installed, and only use for production)

## For development
$ npm run dev # serve with hot reload SCSS & Next.JS change at http://localhost:3000

## For production
$ gulp build # generate CSS file for web
$ npm run build # build .next for production
$ pm2 start npm -- start # host for SSR, must setting proxy-pass on host service with http://localhost:3000 (Apache: https://httpd.apache.org/docs/2.4/mod/mod_proxy.html, Nginx: https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
$ pm2 list # check pm2 commands status

```
