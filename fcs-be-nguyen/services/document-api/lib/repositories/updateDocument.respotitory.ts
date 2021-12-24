import { UpdateItemInput } from 'aws-sdk/clients/dynamodb'
import createError from 'http-errors'

import { callUpdate, convertToDynamoUpdate } from '@libs/dynamodb-lib'

import { DOCUMENT_TABLE_NAME } from '../../env'

export const updateDocument = async (documentData: Partial<IDocument>) => {
  if (!documentData.id) {
    return false
  }
  try {
    return (await callUpdate(convertToDynamoUpdate(DOCUMENT_TABLE_NAME, documentData.id, documentData)))?.Attributes as IDocument
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
}

export const addFilesToDocument = async (docId: string, files: IMediaFile[]) => {
  // TODO: Handle duplicate when recalling upload link
  console.log('<ID> Object: ', docId)
  console.log('<> Insert: ', files)
  const params: UpdateItemInput = {
    TableName: DOCUMENT_TABLE_NAME,
    Key: { id: docId as any },
    UpdateExpression: 'SET #ri = list_append(#ri, :val)',
    ExpressionAttributeValues: {
      ':val': files as any
    },
    ExpressionAttributeNames: {
      '#ri': 'files'
    }
  }
  try {
    await callUpdate(params)
    return true
  } catch (e) {
    console.log(e)
    throw new createError.InternalServerError(e)
  }
}
