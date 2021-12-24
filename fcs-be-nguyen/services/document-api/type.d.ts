import { DOCUMENT_TYPE, DOCUMENT_UPDATE_TYPE } from '@const/index'

import { CONTENT_TYPE_SUFFIX_MAPPINGS } from './utils/media'

interface IFileUpload {
  name: string
  note?: string
  contentType: keyof typeof CONTENT_TYPE_SUFFIX_MAPPINGS
}

interface IUploadLink {
  name: string
  url: string
}

interface IOutputUploadObject {
  ownerId: string
  contentType: valueof<typeof DOCUMENT_TYPE>
  description: string
  failed: IFileUpload[]
  documentId: string
  uploadLinks: IUploadLink[]
}

type TSupportQuery = 'owner' | 'id'
type TSupportUpdate = valueof<typeof DOCUMENT_UPDATE_TYPE>
