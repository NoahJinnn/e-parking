import { USER_STATUS, USER_TYPE } from '../../../../../const'

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
        },
        type: {
          type: 'string',
          default: USER_TYPE.SOCIAL
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

export default createUserSocialSchema
