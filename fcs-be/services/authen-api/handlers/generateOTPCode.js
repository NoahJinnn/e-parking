import validator from '@middy/validator'
import createUserSchema from '../lib/schema/createUserSchema'
import { validatePhoneService } from '../lib/service/phone/validatePhoneService'
import { generateOTPService } from '../lib/service/phone/generateOTPService'
import commonMiddlewave from '../../../libs/commonMiddlewave'

export async function generateOTPCode (event, context) {
  const secretKeys = context.AUTHENTICATION
  // // TODO: Get phone and country code ( remove first 0 )
  const { phone, countryCode } = event.body
  // // TODO: validate phone
  await validatePhoneService(phone, countryCode, secretKeys)
  // // TODO: generate code
  await generateOTPService(phone, countryCode, secretKeys)
  const result = {
    message: 'OTP code sent successfully'
  }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(result)
  }
}

export const handler = commonMiddlewave(generateOTPCode).use(
  validator({
    inputSchema: createUserSchema,
    useDefaults: true
  })
)
