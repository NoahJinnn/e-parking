<!--
title: 'AWS Serverless REST API with DynamoDB store example in Python'
description: 'This example demonstrates how to setup a RESTful Web Service allowing you to create, list, get, update and delete Todos. DynamoDB is used to store the data.'
layout: Doc
framework: v1
platform: AWS
language: Python
authorLink: 'https://github.com/godfreyhobbs'
authorName: 'E-parking team'
authorAvatar: 'https://avatars1.githubusercontent.com/u/8434141?v=4&s=140'
-->
# Serverless REST API

This example demonstrates how to setup a [RESTful Web Services](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services) allowing you to create, list, get, update and delete your entities. DynamoDB is used to store the data. This is just an example and of course you could use any data storage as a backend.

## Structure

This service has a separate directory for all the todo operations. For each operation exactly one file exists e.g. `todos/delete.py`. In each of these files there is exactly one function defined.

The idea behind the `eparking` directory is that in case you want to create a service containing multiple resources e.g. users, notes, comments you could do so in the same service. While this is certainly possible you might consider creating a separate service for each resource. It depends on the use-case and your preference.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup

```bash

npm install -g serverless
npm  install
sls plugin install -n serverless-python-requirements
sls plugin install -n serverless-wsgi

```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash

```

## Usage

You can create, retrieve, update, or delete todos with the following commands:

### Create a Todo

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos --data '{ "text": "Learn Serverless" }'
```

No output

### List all Todos

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/devices/
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/parks/
```

```buildoutcfg
POST method /devices/
{
    "park_id": "abc-xyz",
    "balena_UUID": "AAAAaa",
    "case_UUID": "AAAAAAAA",
    "balena_cloud_uuid": "abc-aaaaa",
    "custom_latitude": "107.5",
    "custom_longitude": "100.2",
    "device_name": "DPU-CPU",
    "device_type": "DPU",
    "ip_address": "192.168.1.1",
    "mac_address":  "AVCASDASDK-AANDC-DDAAL-AAAAC"
}

POST /parks/
{
    "address": "tsurumi ku, yako japan",
    "tel": "07041363920",
    "owner_id": "nhutlm1-abc",
    "available_cabin": 3,
    "balena_cloud_uuid": "abc-dfg",
    "closed_time": "12",
    "fee_for_all_day": 5000,
    "fee_per_hour_for_day":[
        {"1": 12}, {"2": 100}
    ],
    "kyc": true,
    "image":[
         "aaaaa",
         "aaa111a"
    ]

}



```

### Get list devices

```bash
# Get all devices
curl https://fg8i1jx2th.execute-api.ap-southeast-1.amazonaws.com/dev/devices
```

Example Result:
```json
{
  "data": [
    {
      "balena_UUID": "AAAAaa",
      "case_UUID": "AAAAAAAA",
      "created_at": "2021-04-23T17:56:39.064915+0000",
      "custom_latitude": "107.5",
      "custom_longitude": "100.2",
      "device_id": "980b4a6c-a45d-11eb-8e55-0da0fb555413",
      "device_name": "DPU-CPU",
      "device_type": "DPU",
      "ip_address": "192.168.1.1",
      "is_active": true,
      "is_online": true,
      "latitude": null,
      "longitude": null,
      "mac_address": "AVCASDASDK-AANDC-DDAAL-AAAAC",
      "master_device": null,
      "note": null,
      "park_id": "abc-xyz",
      "public_ip_address": null,
      "updatedAt": "2021-04-23T17:56:39.064966+0000"
    }
  ]
}
```

### Get list park

```bash
# get all park
curl -X GET https://fg8i1jx2th.execute-api.ap-southeast-1.amazonaws.com/dev/parks
```

Example Result:
```json
{
  "data": [
    {
      "address": "tsurumi ku, yako japan",
      "available_cabin": "3",
      "balena_cloud_uuid": "abc-dfg",
      "closed_time": "12",
      "country_code": null,
      "cpu_temperature": "null",
      "creation_date": "2021-04-23T17:56:39.077562+0000",
      "dpu_temperature": "null",
      "fee_for_all_day": "5000",
      "fee_per_hour_for_day": [
        {
          "1": 12
        },
        {
          "2": 100
        }
      ],
      "geoJson": null,
      "geohash": null,
      "image": [
        "aaa111a",
        "aaaaa"
      ],
      "kyc": true,
      "name": null,
      "open_time": null,
      "owner_id": "nhutlm1-abc",
      "park_id": "40c93028-a45d-11eb-9442-0da0fb555413",
      "public_url": null,
      "service_available": null,
      "tel": "07041363920",
      "total_cabin": "null"
    },
    {
      "address": "tsurumi ku, yako japan",
      "available_cabin": "3",
      "balena_cloud_uuid": "abc-dfg",
      "closed_time": "12",
      "country_code": null,
      "cpu_temperature": "null",
      "creation_date": "2021-04-23T17:51:22.605279+0000",
      "dpu_temperature": "null",
      "fee_for_all_day": "5000",
      "fee_per_hour_for_day": [
        {
          "1": 12
        },
        {
          "2": 100
        }
      ],
      "geoJson": null,
      "geohash": null,
      "image": [
        "aaa111a",
        "aaaaa"
      ],
      "kyc": true,
      "name": null,
      "open_time": null,
      "owner_id": "nhutlm1-abc",
      "park_id": "8427545f-a45c-11eb-a0f0-5bd912eabede",
      "public_url": null,
      "service_available": null,
      "tel": "07041363920",
      "total_cabin": "null"
    }
  ]
}
```

### Delete a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos/<id>
```

No output

## Scaling

### AWS Lambda

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

### DynamoDB

When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the provisioned throughput and increasing or decreasing capacity as needed.

This is can be done via settings in the `serverless.yml`.

```yaml
  ProvisionedThroughput:
    ReadCapacityUnits: 1
    WriteCapacityUnits: 1
```

In case you expect a lot of traffic fluctuation we recommend to checkout this guide on how to auto scale DynamoDB [https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/](https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/)


## Development Guide

- [How to debug locally and remotely inside container](./docs/Development.md)
- How to set up local environment
```bash
# Run containers
make local 

# Create virtualenv for development
make setup

# Create table schema
make seed
```

- Test
```bash
make test-api
```