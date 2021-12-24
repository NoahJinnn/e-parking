import { USER_STATUS } from '@const/index'

const createUserSocialSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        urn: {
          type: 'string'
        },
        status: {
          type: 'string',
          default: USER_STATUS.ACTIVE
        }
      },
      required: ['urn']
    }
  },
  required: ['body']
}

export default createUserSocialSchema
