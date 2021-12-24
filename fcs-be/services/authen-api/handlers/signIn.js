import jwt from 'jsonwebtoken'
import validator from '@middy/validator'
import otpSchema from '../lib/schema/otpSchema'
import commonMiddlewave from '../../../libs/commonMiddlewave'
import { getUserByPhone } from '../lib/getUserHelper'
import { verifyOtpCode } from '../lib/verifyOTPHelper'
import { createUser } from '../lib/createUserHelper'

async function signIn (event, context) {
  let user
  const secretKeys = context.AUTHENTICATION
  // Get OTP Code
  const { otpCode, phone, countryCode } = event.body
  // validate code if need

  // Call api neutrino verify
  await verifyOtpCode(otpCode, secretKeys)
  // if success
  // check if user exit
  console.log(phone)

  const users = await getUserByPhone(phone, secretKeys)
  // if not exist >> create new user with phone, country code
  if (!users || users.length < 1) {
    user = await createUser(phone, countryCode, secretKeys)
  } else {
    console.log(users)
    user = users[0]
  }

  // if exit >> generate jwt with user
  const token = jwt.sign(user, secretKeys.JWT_KEY, { expiresIn: '1d' })
  // return user
  // if fail >> return errof
  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: 'OTP validate success',
      token: token
    })
  }
}
export const handler = commonMiddlewave(signIn).use(
  validator({
    inputSchema: otpSchema,
    useDefaults: true
  })
)
