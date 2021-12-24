import commonMiddleware from '@libs/commonMiddlewave'

import { registerDeviceHelper } from '../lib/helpers/register'
import { getDebugService } from '../lib/helpers/debug.util'

const logger = getDebugService()

/**
 * Handle for REGISTER Topic. Must have field 'deviceId'
 * Other fields are custom and will be kept if they exist in IDeviceManagement
 *
 * @param event
 */
const registerDeviceThroughMQTT = async (event) => {
  logger.debug('Register Device has been called')
  logger.debug('Event')
  logger.info(event)

  // Create device from deviceId and other information
  await registerDeviceHelper({ ...event, balenaUUID: event.deviceId })
}

export const handlerMQTT = commonMiddleware(registerDeviceThroughMQTT, false)
