import { DOCUMENT_TYPE } from '@const/index'

export const getDocumentSchema = {
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        offset: {
          type: 'number',
          default: 0
        },
        type: {
          type: 'string',
          enum: Object.values(DOCUMENT_TYPE)
        }
      }
    }
  },
  required: ['queryStringParameters']
}
