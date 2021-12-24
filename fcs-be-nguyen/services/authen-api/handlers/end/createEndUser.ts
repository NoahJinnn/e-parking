import validator from '@middy/validator'
import otpSchema from '../../lib/schema/otpSchema'
import commonMiddlewave from '@libs/commonMiddlewave'

import { success } from '@libs/response-lib'
import { createUserByOtp } from 'services/authen-api/lib/helpers/createUserByOtp'
import { generateJwtByOtp } from 'services/authen-api/lib/service/auth/authTokenService'
import { USER_TYPE } from '@const/index'

const createEndUserHandle = async (event, context) => {
  const secretKeys = context.AUTHENTICATION as ISecretKeysObject
  try {
    const user = await createUserByOtp(secretKeys, event, USER_TYPE.END_USER)
    const secretKey = secretKeys.JWT_KEY || process.env.JWT_KEY
    const tokenPayload: IUserToken = {
      id: user.id,
      status: user.status,
      creation_date: user.creation_date
    }
    const token = generateJwtByOtp(tokenPayload, secretKey)
    console.log('generated token', token)

    return success(
      {
        message: 'OTP validate success, user created',
        token,
        user
      },
      201
    )
  } catch (error) {
    throw error // handled by @middy/http-error-handler
  }
}

export const handler = commonMiddlewave(createEndUserHandle, true).use(
  validator({
    inputSchema: otpSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
