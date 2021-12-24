import HttpError from 'http-errors'
import * as dynamoDbLib from '@libs/dynamodb-lib'
import { getDebugService } from '../helpers/debug.util'

const logger = getDebugService()

export const createDevice = async (deviceInfo: IDevice) => {
  const PrefixFn = 'createDevice'

  logger.debug(`${PrefixFn}: Called`)

  let timeCreate = new Date().toISOString()

  const deviceToBeCreated = {
    ...deviceInfo,
    createdAt: timeCreate,
    updatedAt: timeCreate
  }

  logger.debug(`${PrefixFn}: Device to be created`)
  logger.info(deviceToBeCreated)

  try {
    let result = await dynamoDbLib.callPut({
      TableName: process.env.DEVICE_TABLE_NAME,
      Item: deviceToBeCreated
    })

    logger.debug('Create Done')
    logger.info(result)

    return deviceToBeCreated
  } catch (err) {
    logger.error(err)
    throw new HttpError.InternalServerError(err)
  }
}
