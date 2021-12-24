import moment from 'moment'
import createError from 'http-errors'
import * as dynamoDbLib from '@libs/dynamodb-lib'

export const createUser = async (userInfo: IEndUser | IPartnerUser | ISocialUser) => {
  const user = {
    creation_date: moment().unix(),
    ...userInfo
  }

  try {
    await dynamoDbLib.callPut({
      TableName: process.env.USER_TABLE_NAME,
      Item: user
    })
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return user
}
