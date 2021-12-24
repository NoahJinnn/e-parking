import moment from 'moment'

import { updateDocument } from '../repositories/updateDocument.respotitory'

export const updateDocumentStatus = async (docment: IDocument, active: boolean = false) => {
  const updateObj: Partial<IDocument> = {
    id: docment.id,
    active,
    deletion_date: moment().unix()
  }
  return await updateDocument(updateObj)
}

export const updateDocumentDescription = async (docment: IDocument, description: string = '') => {
  const updateObj: Partial<IDocument> = {
    id: docment.id,
    description
  }
  return await updateDocument(updateObj)
}
