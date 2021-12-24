# Test script

node aws-api.js --endpoint a1jgrydl5depqs-ats.iot.ap-southeast-1.amazonaws.com --root-ca ./AmazonRootCA1.pem --cert ca2774b55e-certificate.pem.crt --key ca2774b55e-private.pem.key

**Certificates are IoT resources**

# Docs:

## Use SDK:

https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-sdk-node.html

## Create IoT rule to call lambda function:

https://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html

## Setup bridge between device broker and aws broker:

https://aws.amazon.com/blogs/iot/how-to-bridge-mosquitto-mqtt-broker-to-aws-iot/

## Create IoT resource for device (must do before any connects):

https://docs.aws.amazon.com/iot/latest/developerguide/create-iot-resources.html
