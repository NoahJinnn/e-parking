const createUserSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        phone: {
          type: 'string'
        },
        countryCode: {
          type: 'string',
          default: 'vn'
        }
      },
      required: ['phone', 'countryCode']
    }
  },
  required: ['body']
}

export default createUserSchema
