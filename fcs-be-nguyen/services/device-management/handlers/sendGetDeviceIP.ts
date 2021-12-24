import AWS from 'aws-sdk'
import DebugLevel from 'debug-level'

import commonMiddleware from '@libs/commonMiddlewave'
import { failure, success } from '@libs/response-lib'

// TODO: Put this endpoint in secret manager
const iotData = new AWS.IotData({ endpoint: 'a1jgrydl5depqs-ats.iot.ap-southeast-1.amazonaws.com' })

const businessString = process.env.DEBUG_BUG_BUSINESS_STRING
const serviceString = process.env.DEBUG_SERVICE_NAME
const logSeparator = ':'
const logString = [businessString, serviceString].join(logSeparator)
const debugService = DebugLevel.log(logString)

/**
 * @remoteMethod /device/management/send-get=device-ip
 *
 * @param event
 * @param context
 */
const sendGetDeviceIP = async (event) => {
  const prefixFn = 'sendGetDeviceIP'

  // TODO: Use constant export in lib/service/message-types
  const messageType = 'GET_DEVICE_IP'

  try {
    // TODO: We need to add ACL here. Who can call this API?
    let { deviceId } = event.pathParameters

    // TODO: Get Device from Dynamo DB
    let deviceType = 'cpu'

    // Specs: https://docs.google.com/document/d/1haP47SzQ4kCIgwRDSXA-FLviVf8mWcHKpk7na_O_3d0/edit#bookmark=id.3jmdd2zdsty
    let publishTopic = `cmd/${deviceType}/${deviceId}/eparking/aws/${messageType}`

    let params = {
      topic: publishTopic,
      payload: '',
      qos: 0
    }

    try {
      let result = await iotData.publish(params).promise()
      debugService.info('Publish Successfully')
      debugService.info(result)
    } catch (err) {
      debugService.error('Error while publishing')
      debugService.error(err)
      return failure('Failed to send MQTT message')
    }

    return success(deviceId)
  } catch (e) {
    debugService.error(`Error happened in ${prefixFn}`)
    debugService.error(e)
    return failure('Failed to send MQTT message')
  }
}

export const handler = commonMiddleware(sendGetDeviceIP, false)
