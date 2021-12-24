const updateSocialUserSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        user: {
          type: 'object'
        }
      },
      required: ['user']
    }
  },
  required: ['body']
}

export default updateSocialUserSchema
