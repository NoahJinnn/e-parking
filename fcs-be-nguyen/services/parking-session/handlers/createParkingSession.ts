import commonMiddleware from '@libs/commonMiddlewave'
import { success } from '@libs/response-lib'

import { getDebugService } from '../lib/helpers/debug.util'
import { createParkingSession } from '../lib/repository/createParkingSession.repository'

const logger = getDebugService()

/**
 * @remoteMethod /parkingSession
 *
 * @param event
 * @param context
 */
const createParkingSessionHandle = async (event) => {
  try {
    const parkingSession = await createParkingSession(event.body)
    logger.info(`Parking session created:`)
    logger.info(event.body)
    return success(
      {
        message: 'Create parking session successfully',
        parkingSession
      },
      201
    )
  } catch (error) {
    logger.error('Creating parking session failed!')
    throw error // handled by @middy/http-error-handler
  }
}

export const handler = commonMiddleware(createParkingSessionHandle, false)
