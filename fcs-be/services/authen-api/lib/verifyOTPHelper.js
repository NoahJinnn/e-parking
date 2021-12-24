import axios from 'axios'
import createError from 'http-errors'

export async function verifyOtpCode (otpCode, secretKeys) {
  let result
  // Call api neutrino verify
  const requestBody = {
    'user-id': secretKeys.NEUTRINO_USER_ID,
    'api-key': secretKeys.NEUTRINO_API_KEY,
    'security-code': otpCode
  }

  const url = `${secretKeys.NEUTRINO_API_ROOT}/verify-security-code`

  try {
    const response = await axios.post(url, requestBody)
    result = response.data
  } catch (error) {
    console.log(error)
  }
  // check if error or not
  if (!result.verified) {
    throw new createError.InternalServerError('OTP Expired')
  }
  return true
}
