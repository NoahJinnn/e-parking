import validator from '@middy/validator'
import createUserSchema from '../lib/schema/createUserSchema'
import { validatePhoneService } from '../lib/service/phone/validatePhoneService'
import { generateOTPService } from '../lib/service/phone/generateOTPService'
import commonMiddlewave from '@libs/commonMiddlewave'
import { failure, success } from '@libs/response-lib'

export const generateOTPCode = async (event, context) => {
  try {
    const secretKeys = context.AUTHENTICATION as ISecretKeysObject
    const { phone, countryCode } = event.body
    await validatePhoneService(phone, countryCode, secretKeys)
    await generateOTPService(phone, countryCode, secretKeys)
  } catch (e) {
    console.log(e)
    return failure('OTP generate failed')
  }
  return success('OTP code sent successfully')
}

export const handler = commonMiddlewave(generateOTPCode, true).use(
  validator({
    inputSchema: createUserSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
