import commonMiddleware from '@libs/commonMiddlewave'
import { success } from '@libs/response-lib'

import { getDebugService } from '../lib/helpers/debug.util'
import { updateParkingSession } from '../lib/repository/updateParkingSession.repository'

const logger = getDebugService()

/**
 * @remoteMethod /parkingSession
 *
 * @param event
 * @param context
 */
const updateParkingSessionHandle = async (event) => {
  try {
    const updatedSession = await updateParkingSession(event.body)
    logger.info(`Parking session updated:`)
    logger.info(event.body)
    return success(
      {
        message: 'Update parking session successfully',
        updatedSession
      },
      201
    )
  } catch (error) {
    logger.error('Creating parking session failed!')
    throw error // handled by @middy/http-error-handler
  }
}

export const handler = commonMiddleware(updateParkingSessionHandle, false)
