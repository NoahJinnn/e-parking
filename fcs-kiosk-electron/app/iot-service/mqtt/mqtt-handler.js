const { MqttClient } = require('mqtt')
const { DPU_DATA_CAR_TRACKING_CHECKIN, DPU_REQUEST_IS_PARKING_AVAILABLE } = require('./mqtt-constants')
const { mqttPublishIsParkingAvailable } = require('./mqtt-pub')

/**
 *
 * @param {MqttClient} cpuClient
 */
const mqttHandler = (cpuClient) => {
  cpuClient.on('message', function(topic, message) {
    // message is Buffer
    if (topic === DPU_DATA_CAR_TRACKING_CHECKIN) {
      console.log(message.toString())
    }

    if (topic === DPU_REQUEST_IS_PARKING_AVAILABLE) {
      mqttPublishIsParkingAvailable(cpuClient)
    }
  })
}

module.exports = mqttHandler
