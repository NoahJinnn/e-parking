const { MqttClient } = require('mqtt')
const logger = require('../../logger')
const { successMqttLog, failMqttLog } = require('../../logger/msg-generator')
const { DPU_RESPONSE_IS_PARKING_AVAILABLE } = require('./mqtt-constants')

/**
 *
 * @param {MqttClient} cpuClient
 */
const mqttPublishIsParkingAvailable = (cpuClient) => {
  cpuClient.publish(DPU_RESPONSE_IS_PARKING_AVAILABLE, 'hello shit', (error) => {
    handler(DPU_RESPONSE_IS_PARKING_AVAILABLE, () => {}, error)
  })
}

const handler = (topic, job, error) => {
  if (!error) {
    job()
    logger.info(successMqttLog('PUBLISH', topic))
  } else {
    logger.error(failMqttLog('PUBLISH', topic, error))
  }
}

module.exports = {
  mqttPublishIsParkingAvailable,
}
