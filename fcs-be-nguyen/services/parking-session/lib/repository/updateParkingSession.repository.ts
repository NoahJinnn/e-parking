import createError from 'http-errors'

import * as dynamoDbLib from '@libs/dynamodb-lib'
import { generateDynamoUpdateSchema } from '@libs/utils'

export const updateParkingSession = async (updateInfo: ParkingSession) => {
  const { id, ...updateSession } = updateInfo
  let updatedParkingSession
  const param = generateDynamoUpdateSchema(id, updateSession, process.env.PARKING_SESSION_TABLE_NAME)
  try {
    updatedParkingSession = await dynamoDbLib.callUpdate(param)
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return updatedParkingSession
}
