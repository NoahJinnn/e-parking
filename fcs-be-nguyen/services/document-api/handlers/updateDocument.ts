import { DOCUMENT_UPDATE_TYPE } from '@const/index'
import commonMiddlewave from '@libs/commonMiddlewave'
import { failure, success } from '@libs/response-lib'
import validator from '@middy/validator'

import { updateDocumentDescription, updateDocumentStatus } from '../lib/helpers/documents'
import { addFilesToDocument, updateFileInDoc } from '../lib/helpers/files'
import { getDocumentById } from '../lib/repositories/getDocument.repository'
import { updateDocumentSchema } from '../lib/schemas/updateDocumentSchema'
import { TSupportUpdate } from '../type'
import { getSupportedContentTypes, isSupportedFiles } from '../utils/media'

export const putUpdateDocument = async (event, _context) => {
  const param = event.body.param
  if (!param) {
    return failure('Missing update param!')
  }
  // Type of content
  const updateType: TSupportUpdate = event.pathParameters!.update_document_type
  const documentId: string = event.pathParameters!.update_document_id
  const document = await getDocumentById(documentId)
  try {
    switch (updateType) {
      case DOCUMENT_UPDATE_TYPE.STATUS: {
        let query = await updateDocumentStatus(document, param)
        if (query) {
          return success({
            message: 'Update status success!',
            data: {
              documentId: query.id,
              active: query.active
            }
          })
        }
        break
      }
      case DOCUMENT_UPDATE_TYPE.DESCRIPTION: {
        let query = await updateDocumentDescription(document, param)
        if (query) {
          return success({
            message: 'Update description success!',
            data: {
              documentId: query.id,
              description: query.description
            }
          })
        }
        break
      }
      case DOCUMENT_UPDATE_TYPE.ADD_FILES: {
        if (!isSupportedFiles(param)) {
          return failure(`Invalid contentType for file. Valid values are: ${getSupportedContentTypes().join(', ')}`)
        }
        let query = await addFilesToDocument(document, param)
        if (query) {
          if (query.uploadLinks.length > 0) {
            return success({
              message: 'Generate add links success!',
              data: query
            })
          } else {
            return failure({
              message: 'Generate add links failure!',
              data: query
            })
          }
        }
        break
      }
      case DOCUMENT_UPDATE_TYPE.DEL_FILES: {
        let query = await updateFileInDoc(document, param, { active: false })
        if (query) {
          return success({
            message: 'Delete file success!',
            data: {
              id: query.id,
              files: query.files
            }
          })
        }
        break
      }
      case DOCUMENT_UPDATE_TYPE.MOD_FILES: {
        let query = await updateFileInDoc(document, param.url, param)
        if (query) {
          return success({
            message: 'Modify file success!',
            data: {
              id: query.id,
              fileUpdate: param
            }
          })
        }
        break
      }
      default:
        return failure(`Not support update type!`)
    }
  } catch (e) {
    console.log(e)
  }
  return failure('Processed request failure!')
}

export const handler = commonMiddlewave(putUpdateDocument, false).use(
  validator({
    inputSchema: updateDocumentSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
