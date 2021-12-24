const getUserSchema = {
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['Active', 'InActive'],
          default: 'Active'
        },
        phone: {
          type: 'string',
          default: ''
        }
      }
    }
  },
  required: ['queryStringParameters']
}

export default getUserSchema
