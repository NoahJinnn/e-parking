import axios from 'axios'
import createError from 'http-errors'
import { OTP_FAIL } from '@const/error'

export const generateOTPService = async (phone: string, countryCode: string, secretKeys: ISecretKeysObject) => {
  // TODO: Don't need to return back code ( For security reason )
  let result: {
    sent: string
    numberValid: string
    securityCode: string
  }
  const url = `${secretKeys.NEUTRINO_API_ROOT || process.env.NEUTRINO_API_ROOT}/sms-verify`

  const requestBody = {
    'user-id': secretKeys.NEUTRINO_USER_ID || process.env.NEUTRINO_USER_ID,
    'api-key': secretKeys.NEUTRINO_API_KEY || process.env.NEUTRINO_API_KEY,
    'country-code': countryCode,
    number: phone,
    'code-length': 6
  }

  try {
    const response = await axios.post(url, requestBody)
    if (!response.data['number-valid'] || !response.data.sent) {
      throw new createError.InternalServerError(OTP_FAIL)
    }
    result = {
      sent: response.data.sent,
      numberValid: response.data['number-valid'],
      securityCode: response.data['security-code']
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(OTP_FAIL)
  }
  return result
}
