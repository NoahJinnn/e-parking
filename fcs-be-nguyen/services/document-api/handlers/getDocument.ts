import { DOCUMENT_TYPE } from '@const/index'
import commonMiddlewave from '@libs/commonMiddlewave'
import { failure, success } from '@libs/response-lib'
import validator from '@middy/validator'

import { MAX_LENGTH_ARRAY_IN_RES } from '../env'
import { getDocumentById, getDocumentByOwnerId } from '../lib/repositories/getDocument.repository'
import { getDocumentSchema } from '../lib/schemas/getDocumentSchema'
import { TSupportQuery } from '../type'
import { toSubArrays } from '../utils/tools'

export const getDocuments = async (event, _context) => {
  // Type of content
  const queryType: TSupportQuery = event.pathParameters!.get_type
  const queryId: string = event.pathParameters!.get_id
  switch (queryType) {
    case 'owner':
      const offset: number = event.queryStringParameters['offset']
      const contentType: valueof<typeof DOCUMENT_TYPE> = event.queryStringParameters['type'] || 'user_others'
      const documents = await getDocumentByOwnerId(queryId, contentType)
      if (documents.length === 0) {
        return failure('Not found any document!')
      }
      let sub: IDocument[][] = []
      if (documents.length > MAX_LENGTH_ARRAY_IN_RES) {
        sub = toSubArrays(documents, MAX_LENGTH_ARRAY_IN_RES)
      } else {
        sub = [documents]
      }
      if (sub[offset]) {
        return success({
          offset,
          data: sub[offset],
          haveMore: documents.length > (offset + 1) * MAX_LENGTH_ARRAY_IN_RES
        })
      } else {
        return failure('Out of offset range')
      }
    case 'id':
      const document = await getDocumentById(queryId)
      if (document) {
        return success({
          ...document,
          files: document.files.filter((val) => val.active)
        })
      } else {
        return failure('Document not found!')
      }
    default:
      return failure('Not support query type!')
  }
}

export const handler = commonMiddlewave(getDocuments, false).use(
  validator({
    inputSchema: getDocumentSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
