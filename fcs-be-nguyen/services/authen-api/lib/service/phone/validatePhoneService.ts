import axios from 'axios'
import createError from 'http-errors'
import { PHONE_NOT_VALID } from '@const/error'
export const validatePhoneService = async (phone: string, countryCode: string, secretKeys: ISecretKeysObject) => {
  let result
  const url = `${secretKeys.NEUTRINO_API_ROOT || process.env.NEUTRINO_API_ROOT}/phone-validate`

  const requestBody = {
    'user-id': secretKeys.NEUTRINO_USER_ID || process.env.NEUTRINO_USER_ID,
    'api-key': secretKeys.NEUTRINO_API_KEY || process.env.NEUTRINO_API_KEY,
    'country-code': countryCode,
    number: phone
  }
  try {
    const response = await axios.post(url, requestBody)
    result = response.data
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(PHONE_NOT_VALID)
  }
  return result
}
