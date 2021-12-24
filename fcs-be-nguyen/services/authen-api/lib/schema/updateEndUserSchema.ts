const updateEndUserSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        birthDate: {
          type: 'number'
        }
      }
    }
  },
  required: ['body']
}

export default updateEndUserSchema
