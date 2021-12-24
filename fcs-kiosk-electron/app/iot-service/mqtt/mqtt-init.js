const mqtt = require('mqtt')
const mqttHandler = require('./mqtt-handler')
const mqttSubscribe = require('./mqtt-sub')

const connectMQTT = () => {
  const options = {
    connectTimeout: 4000,

    // Authentication
    clientId: 'emqx11',
    username: 'admin',
    password: 'public',

    keepalive: 60,
    clean: true,
    reconnectPeriod: 0,
  }

  const cpuClient = mqtt.connect('mqtt://localhost:1883', options)
  cpuClient.on('connect', () => {
    console.log('Connect success')
    mqttSubscribe(cpuClient)
    mqttHandler(cpuClient)
  })

  cpuClient.on('reconnect', (error) => {
    console.log('reconnecting MQTT broker:', error)
  })

  cpuClient.on('error', (error) => {
    console.log('Connect MQTT broker failed:', error.message)
  })

  return cpuClient
}

module.exports = {
  connectMQTT,
}
