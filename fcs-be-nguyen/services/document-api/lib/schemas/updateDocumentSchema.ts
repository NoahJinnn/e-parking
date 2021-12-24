export const updateDocumentSchema = {
  properties: {
    body: {
      type: 'object',
      properties: {
        param: {
          type: ['string', 'object', 'array']
        }
      },
      required: ['param']
    }
  },
  required: ['body']
}
