import { DOCUMENT_TYPE } from '@const/index'
import commonMiddlewave from '@libs/commonMiddlewave'
import { failure, success } from '@libs/response-lib'
import validator from '@middy/validator'

import { addFilesToDocument } from '../lib/helpers/files'
import { createDocument } from '../lib/repositories/createDocument.repository'
import { createDocumentSchema } from '../lib/schemas/createDocumentSchema'
import { IFileUpload, IOutputUploadObject } from '../type'
import { getSupportedContentTypes, isSupportedFiles } from '../utils/media'

export const postCreateDocument = async (event, _context) => {
  // Type of content
  const contentType: valueof<typeof DOCUMENT_TYPE> = event.pathParameters!.upload_type
  // Init parameters
  const bodyReq = event.body
  const ownerId: string = bodyReq.ownerId
  const files: IFileUpload[] = bodyReq.files
  const description: string = bodyReq.description || ''

  // Check all files if supported
  if (!isSupportedFiles(files)) {
    return failure(`Invalid contentType for file. Valid values are: ${getSupportedContentTypes().join(', ')}`)
  }
  // Create new documents for store these files
  let document = await createDocument({
    ownerId,
    type: contentType,
    description,
    files: []
  })
  // Create upload link for each file
  let updateObject = await addFilesToDocument(document, files)
  const output: Partial<IOutputUploadObject> = {
    ownerId,
    contentType,
    description,
    failed: updateObject.failed
  }
  if (updateObject.uploadLinks.length > 0) {
    return success({
      ...output,
      documentId: document.id,
      uploadLinks: updateObject.uploadLinks
    })
  } else {
    return failure({
      ...output,
      message: "Can't create upload links"
    })
  }
}

export const handler = commonMiddlewave(postCreateDocument, false).use(
  validator({
    inputSchema: createDocumentSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
