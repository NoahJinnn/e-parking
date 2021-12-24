FROM balenalib/raspberrypi4-64-alpine-node:latest

# Move to app dir
WORKDIR /usr/src/app

# Move package.json to filesystem
COPY ./app/package.json ./

# Install npm modules for the application
RUN JOBS=MAX npm install --unsafe-perm --production && npm cache clean --force && \
  rm -rf /tmp/* && node_modules/.bin/electron-rebuild

# Move app to filesystem
COPY ./app ./

# Build react app
RUN JOBS=MAX npm run build

## uncomment if you want systemd
ENV INITSYSTEM on

# Start app
CMD ["bash", "/usr/src/app/start.sh"]
