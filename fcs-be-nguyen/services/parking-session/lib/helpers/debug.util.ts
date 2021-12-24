import DebugLevel from 'debug-level'

export const getDebugService = () => {
  /* DEBUG CONFIG */
  const businessString = process.env.DEBUG_BUG_BUSINESS_STRING || null
  const serviceString = process.env.DEBUG_SERVICE_NAME || null
  const logSeparator = ':'
  const logString = [businessString, serviceString].join(logSeparator)
  return DebugLevel.log(logString)
}
