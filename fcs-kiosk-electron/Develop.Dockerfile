FROM node:12-buster as build

WORKDIR /app

SHELL ["/bin/bash", "-c"]

ENV PATH /app/node_modules/.bin:$PATH

RUN apt-get update && apt-get install -y --no-install-recommends \
    apt-utils \
    build-essential \
    clang \
    libxcb-image0 \
    libxcb-util0 \
    xdg-utils \
    libdbus-1-dev \
    libgtk2.0-dev \
    libnotify-dev \
    libgconf2-dev \
    libasound2-dev \
    libcap-dev \
    libcups2-dev \
    libxtst-dev \
    libxss1 \
    libnss3-dev \
    libsmbclient \
    libssh-4 \
    fbset \
    libexpat-dev \
    libgtk2.0-0 \
    libx11-xcb1 \
    libxtst6 \
    libgconf-2-4 \
    libnss3 \
    libasound2 \
    libxcb-dri3-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libdrm2 \
    libgbm1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libatk1.0-0 \
    libgl1-mesa-dri \
    libcanberra-gtk-module \
    libcanberra-gtk3-module \
    && rm -rf /var/lib/apt/lists/*

COPY app/package.json .
RUN yarn install && \
    yarn add node-sass@4.12.0 && \
    yarn add electron-rebuild && \
    electron-rebuild

ADD app .
RUN yarn build-fe

# CMD [ "electron", ".", "--no-sandbox" ]

RUN electron-packager . --platform=$PLATFORM --arch=$ARCHITECT --out=packager --overwrite=true --prune=false

# # Production
FROM node:12-buster-slim

# RUN useradd --create-home appuser
# WORKDIR /home/appuser

WORKDIR /app

ENV QT_X11_NO_MITSHM 1

COPY --from=build /app/packager .

RUN apt-get update && apt-get install -y --no-install-recommends \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libdrm2 \
    libgbm1 \
    libxss1 \
    libasound2 \
    libgl1-mesa-dri \
    libcanberra-gtk3-module \
    && rm -rf /var/lib/apt/lists/*

# USER appuser
ADD app ./test

CMD ./fcs_parking_kiosk_controller-linux-x64/fcs_parking_kiosk_controller --no-sandbox
