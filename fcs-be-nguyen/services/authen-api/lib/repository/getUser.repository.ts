import createError from 'http-errors'
import * as dynamoDbLib from '@libs/dynamodb-lib'

export const getUserByPhone = async (phone: string, status: string, userType: number) => {
  let result

  const params = {
    TableName: process.env.USER_TABLE_NAME,
    IndexName: 'phoneAndUserType',
    KeyConditionExpression: 'phone = :phone AND userType = :userType',
    FilterExpression: '#stt = :status',
    ExpressionAttributeValues: {
      ':status': status,
      ':phone': phone,
      ':userType': userType
    },
    ExpressionAttributeNames: {
      '#stt': 'status'
    }
  }

  try {
    result = await dynamoDbLib.callQuery(params)
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return result.Items
}

export const getUserById = async (id: string) => {
  let result

  const params = {
    TableName: process.env.USER_TABLE_NAME,
    Key: { id: id }
  }

  try {
    result = await dynamoDbLib.callGet(params)
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return result.Item
}
