import { v4 as uuid } from 'uuid'

import validator from '@middy/validator'
import createError from 'http-errors'
import moment from 'moment'
import commonMiddlewave from '../../../libs/commonMiddlewave'
import { verifyOtpCode } from '../lib/verifyOTPHelper'
import otpSchema from '../lib/schema/otpSchema'
import { USER_STATUS } from '../../../const'
import * as dynamoDbLib from '../../libs/dynamodb-lib'

async function signUp (event, context) {
  // event > contain all infor about request
  // context : metadata in lambda
  const secretKeys = context.AUTHENTICATION
  const { otpCode, phone, countryCode } = event.body

  await verifyOtpCode(otpCode, secretKeys)

  const user = {
    id: uuid(),
    status: USER_STATUS.ACTIVE,
    name: '',
    email: '',
    phone: phone,
    countryCode: countryCode,
    creation_date: moment().unix()
  }

  try {
    await dynamoDbLib
      .call('put', {
        TableName: secretKeys.USER_TABLE_NAME,
        Item: user
      })
      .promise()
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(user)
  }
}

export const handler = commonMiddlewave(signUp).use(
  validator({
    inputSchema: otpSchema,
    useDefaults: true
  })
)
