import createError from 'http-errors'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import * as dynamoDbLib from '@libs/dynamodb-lib'

import { DOCUMENT_TABLE_NAME } from '../../env'

export const createDocument = async (documentInfo: IDocumentInfo): Promise<IDocument> => {
  const document = {
    id: uuid(),
    ...documentInfo,
    creation_date: moment().unix()
  }

  try {
    await dynamoDbLib.callPut({
      TableName: DOCUMENT_TABLE_NAME,
      Item: document
    })
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
  return document as IDocument
}
