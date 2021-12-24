import { IFileUpload } from 'services/document-api/type'
import { generateUploadLink } from 'services/document-api/utils/s3'

import { updateDocument } from '../repositories/updateDocument.respotitory'

export const addFilesToDocument = async (document: IDocument, files: IFileUpload[]) => {
  const failed: IFileUpload[] = []
  let uploadLinks: { name: string; url: string }[] = []
  for (let file of files) {
    try {
      uploadLinks.push({
        name: file.name,
        url: await generateUploadLink(file, {
          type: document.type as any,
          description: file.note || '',
          ownerId: document.ownerId,
          documentId: document.id
        })
      })
    } catch (e) {
      console.log(e)
      failed.push(file)
    }
  }
  return {
    documentId: document.id,
    failed,
    uploadLinks
  }
}

export const updateFileInDoc = async (document: IDocument, fileUrl: string, updateInfo: Partial<IMediaFile>) => {
  const updateList = document.files.map((val) => {
    if (val.url === fileUrl) {
      return {
        ...val,
        ...updateInfo
      }
    }
    return val
  })
  return await updateDocument({ id: document.id, files: updateList })
}
