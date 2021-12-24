import createError from 'http-errors'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import * as dynamoDbLib from '@libs/dynamodb-lib'

export const createParkingSession = async (parkingSessionInfo: ParkingSession) => {
  const parkingSession = {
    id: uuid(),
    creation_date: moment().unix(),
    ...parkingSessionInfo
  }

  try {
    await dynamoDbLib.callPut({
      TableName: process.env.PARKING_SESSION_TABLE_NAME,
      Item: parkingSession
    })
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return parkingSession
}
