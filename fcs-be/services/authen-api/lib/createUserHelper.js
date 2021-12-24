import { v4 as uuid } from 'uuid'
import moment from 'moment'
import createError from 'http-errors'
import * as dynamoDbLib from '../../../libs/dynamodb-lib'
import { DYNAMO_QUERY, USER_ROLE, USER_STATUS } from '../../../const'
export async function createUser (phone, countryCode, secretKeys) {
  const user = {
    id: uuid(),
    status: USER_STATUS.ACTIVE,
    name: phone,
    email: '',
    phone: phone,
    countryCode: countryCode,
    role: USER_ROLE.SUPER_ADMIN,
    creation_date: moment().unix()
  }

  try {
    await dynamoDbLib.call(DYNAMO_QUERY.PUT, {
      TableName: secretKeys.USER_TABLE_NAME,
      Item: user
    })
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return user
}
