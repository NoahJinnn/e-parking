const { MqttClient } = require('mqtt')
const logger = require('../../logger')
const { successMqttLog, failMqttLog } = require('../../logger/msg-generator')
const { DPU_DATA_CAR_TRACKING_CHECKIN, DPU_REQUEST_IS_PARKING_AVAILABLE } = require('./mqtt-constants')

/**
 *
 * @param {MqttClient} cpuClient
 */
const mqttSubscribe = (cpuClient) => {
  cpuClient.subscribe(DPU_DATA_CAR_TRACKING_CHECKIN, function(err) {
    handler(DPU_DATA_CAR_TRACKING_CHECKIN, () => {}, err)
  })

  cpuClient.subscribe(DPU_REQUEST_IS_PARKING_AVAILABLE, function(err) {
    handler(DPU_REQUEST_IS_PARKING_AVAILABLE, () => {}, err)
  })
}

const handler = (topic, job, err) => {
  if (!err) {
    job()
    logger.info(successMqttLog('SUBSCRIBE', topic))
  } else {
    logger.error(failMqttLog('SUBSCRIBE', topic, err))
  }
}

module.exports = mqttSubscribe
