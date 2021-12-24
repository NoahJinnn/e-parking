/**
 *
 * @param {string} verb
 * @param {string} topic
 */
const successMqttLog = (verb, topic) => {
  return `Successfully ${verb} topic - ${topic}`
}

/**
 *
 * @param {string} verb
 * @param {string} topic
 * @param {any} err
 */
const failMqttLog = (verb, topic, err) => {
  return `Failed to ${verb} topic - ${topic} because of:\n${err}`
}

module.exports = {
  successMqttLog,
  failMqttLog,
}
