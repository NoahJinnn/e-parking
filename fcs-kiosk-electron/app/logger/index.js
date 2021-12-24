const winston = require('winston')

// The Logger Category
const CATEGORY = '[KIOSK-CONTROLLER]'

// Logger configuration
const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: CATEGORY,
    }),
    winston.format.timestamp(),
    winston.format.printf((info) => {
      return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`
    }),
  ),
}

const logger = winston.createLogger(logConfiguration)
module.exports = logger
