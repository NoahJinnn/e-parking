import createError from 'http-errors'

import * as dynamoDbLib from '@libs/dynamodb-lib'
import { generateDynamoUpdateSchema } from '@libs/utils'

export const updateUser = async (userInfo: IUserUpdateInfo) => {
  const { id, ...updateInfo } = userInfo

  const param = generateDynamoUpdateSchema(id, updateInfo, process.env.USER_TABLE_NAME)

  let user
  try {
    user = await dynamoDbLib.callUpdate(param)
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return user
}
