FROM nikolaik/python-nodejs:python3.8-nodejs14

WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm i && npm i -g serverless@2.35.0

COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

COPY . /app

ENTRYPOINT tail -f /dev/null