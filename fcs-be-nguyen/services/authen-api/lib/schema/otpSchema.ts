const otpSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        otpCode: {
          type: 'string'
        },
        phone: {
          type: 'string'
        },
        countryCode: {
          type: 'string',
          default: 'vn'
        }
      },
      required: ['otpCode', 'phone', 'countryCode']
    }
  },
  required: ['body']
}

export default otpSchema
