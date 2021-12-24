FROM node:12-slim

WORKDIR /app

RUN apt update && apt install -y git
RUN npm install -g dynamodb-admin
ENV DYNAMO_ENDPOINT=http://dynamodb:8000

ENTRYPOINT ["dynamodb-admin"]
