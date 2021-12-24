export const createDocumentSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        ownerId: {
          type: 'string'
        },
        files: {
          type: 'array',
          minItems: 1,
          additionalItems: false,
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              note: {
                type: 'string',
                default: ''
              },
              contentType: {
                type: 'string'
              }
            },
            required: ['name', 'contentType']
          },
          default: []
        }
      },
      required: ['ownerId', 'files']
    }
  },
  required: ['body']
}
