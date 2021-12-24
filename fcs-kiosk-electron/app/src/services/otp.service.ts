import axiosApi from './api'

export const verifyPhoneNumber = (phone: string, countryCode: string) => {
  return axiosApi.post(
    'otp-generation',
    {
      phone,
      countryCode,
    },
    {
      headers: {
        'x-api-key': process.env.REACT_APP_PRIVATE_KEY,
      },
    },
  )
}

export const verifyOTP = (otpCode: string, phone: string, countryCode: string) => {
  return axiosApi.post('sign-in', {
    otpCode,
    phone,
    countryCode,
  })
}
