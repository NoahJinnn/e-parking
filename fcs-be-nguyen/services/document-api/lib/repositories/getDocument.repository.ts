import { DOCUMENT_TYPE } from '@const/index'
import * as dynamoDbLib from '@libs/dynamodb-lib'

import { DOCUMENT_TABLE_NAME } from '../../env'

export const getDocumentById = async (id: string): Promise<IDocument> => {
  const params = {
    TableName: DOCUMENT_TABLE_NAME,
    Key: { id: id }
  }

  try {
    const out = await dynamoDbLib.callGet(params)
    return out.Item as any
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getDocumentByOwnerId = async (ownerId: string, contentType: valueof<typeof DOCUMENT_TYPE>): Promise<IDocument[]> => {
  const params = {
    TableName: DOCUMENT_TABLE_NAME,
    IndexName: 'TypeAndOwnerID',
    KeyConditionExpression: 'ownerId = :owner AND #type = :contentType',
    ExpressionAttributeNames: {
      '#type': 'type'
    },
    ExpressionAttributeValues: {
      ':owner': ownerId,
      ':contentType': contentType
    }
  }
  try {
    const out = await dynamoDbLib.callQuery(params)
    return out.Items as any
  } catch (error) {
    console.log(error)
    return null
  }
}
