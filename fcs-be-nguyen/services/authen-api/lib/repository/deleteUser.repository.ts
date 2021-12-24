import createError from 'http-errors'
import * as dynamoDbLib from '@libs/dynamodb-lib'

export const deleteUser = async (id: string) => {
  const param = {
    TableName: process.env.USER_TABLE_NAME,
    Key: { id },
    ReturnValues: 'ALL_OLD'
  }

  let user
  try {
    user = await dynamoDbLib.callDelete(param)
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return user
}
