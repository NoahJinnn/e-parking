/**
 *
 * @param {string} topicType
 * @param {string} destinationType
 * @param {string} destinationId
 * @param {string} deviceApplication
 * @param {string} messageType
 */
const generateTopic = (topicType, destinationType, destinationId, deviceApplication, messageType) => {
  return `${topicType}/${destinationType}/${destinationId}/${deviceApplication}/${messageType}`
}

//* PUBLISH TOPIC
const DPU_RESPONSE_IS_PARKING_AVAILABLE = generateTopic('cmd', 'cpu', 1, 'parking-management', 'RESPONSE_IS_PARKING_AVAILABLE')

//* SUBSCRIBE TOPIC
const DPU_REQUEST_IS_PARKING_AVAILABLE = generateTopic('cmd', 'cpu', -1, 'parking-management', 'IS_PARKING_AVAILABLE')
const DPU_DATA_CAR_TRACKING_CHECKIN = generateTopic('dt', 'dpu', -1, 'parking-info', 'CAR_TRACKING_CHECKIN')

module.exports = {
  DPU_REQUEST_IS_PARKING_AVAILABLE,
  DPU_DATA_CAR_TRACKING_CHECKIN,
  DPU_RESPONSE_IS_PARKING_AVAILABLE,
}
