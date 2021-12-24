FROM ubuntu:18.04

# Install base dependencies
RUN apt-get update \
    && apt-get install -y nginx nano curl

# Replace shell with bash so we can source files
RUN rm /bin/sh \
    && ln -s /bin/bash /bin/sh

# Install nvm and nodejs 12.18.2
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 12.18.2
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install yarn & nodejs's dependencies
RUN npm i yarn -g
RUN npm i pm2 -g
RUN yarn add global gulp

# Setup nginx's config
ENV NGINX_DIR /etc/nginx
RUN rm -rf $NGINX_DIR/sites-available/default \
    && rm -rf $NGINX_DIR/sites-enabled/default
COPY docker/nginx.conf $NGINX_DIR/sites-available/fcspartner.conf
RUN ln -s $NGINX_DIR/sites-available/fcspartner.conf $NGINX_DIR/sites-enabled

# Setup source code
RUN mkdir /var/www/html/FCSWebForPartner
ENV APP_DIR /var/www/html/FCSWebForPartner
WORKDIR $APP_DIR

ADD . $APP_DIR
COPY .env.example $APP_DIR/.env
RUN cd $APP_DIR \
    && rm -rf .next \
    && rm -rf public/client-asset \
    && yarn \
    && yarn gulp build \
    && yarn build

# Setup startup
COPY docker/startup.sh /startup.sh
RUN chmod +x /startup.sh

ENTRYPOINT ["/startup.sh"]

EXPOSE 80

# Start app with pm2
CMD ["pm2-runtime", "npm", "--", "start"]