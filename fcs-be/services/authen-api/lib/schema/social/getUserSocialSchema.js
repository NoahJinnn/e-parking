const getUserSocialSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        urn: {
          type: 'string'
        }
      },
      required: [
        'urn'
      ]
    }
  },
  required: [
    'body'
  ]
}

export default getUserSocialSchema
