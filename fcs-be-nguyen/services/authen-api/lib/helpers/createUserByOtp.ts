import { USER_STATUS, USER_TYPE } from '@const/index'
import { getUserByPhone } from '../repository/getUser.repository'
import { verifyOtpCode } from '../service/phone/verifyOTPService'
import { v4 as uuid } from 'uuid'
import { createUser } from '../repository/createUser.repository'

export const createUserByOtp = async (otpSecretKeys, event, userType: number) => {
  // const secretKeys = context.AUTHENTICATION as ISecretKeysObject
  // // Get OTP Code
  const { otpCode, phone, countryCode } = event.body

  // Call api neutrino verify
  await verifyOtpCode(otpCode, otpSecretKeys)
  // if success
  // check if user exit
  console.log('verify successfully', phone)
  const users = await getUserByPhone(phone, USER_STATUS.ACTIVE, USER_TYPE.END_USER)
  console.log('get end user', users)
  // if not exist >> create new user with phone, country code
  let user
  if (!users || users.length < 1) {
    const newUser: IEndUser = {
      id: uuid(),
      userType,
      status: USER_STATUS.ACTIVE,
      phone,
      countryCode
    }
    user = await createUser(newUser)
    console.log('new user', user)
  } else {
    user = users[0]
  }
  return user
}
