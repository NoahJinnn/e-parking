import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import moment from 'moment'

import config from '@config'
import { DYNAMO_QUERY } from '@const/index'

import AWS from './aws-sdk'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
export function call (action: valueof<typeof DYNAMO_QUERY>, params) {
  // Parameterize table names with stage name
  console.log(`${params.TableName}-${config.resourcesStage}`)
  return dynamoDb[action]({
    ...params,
    TableName: `${params.TableName}-${config.resourcesStage}`
  }).promise()
}

export const callQuery = async (params: DocumentClient.QueryInput) => {
  return call(DYNAMO_QUERY.QUERY, params) as DocumentClient.QueryOutput
}
export const callGet = async (params: DocumentClient.GetItemInput) => {
  return call(DYNAMO_QUERY.GET, params) as DocumentClient.GetItemOutput
}
export const callPut = async (params: DocumentClient.PutItemInput) => {
  return call(DYNAMO_QUERY.PUT, params) as DocumentClient.PutItemOutput
}
export const callUpdate = async (params: DocumentClient.UpdateItemInput) => {
  return call(DYNAMO_QUERY.UPDATE, params) as DocumentClient.UpdateItemOutput
}
export const callDelete = async (params: DocumentClient.DeleteItemInput) => {
  return call(DYNAMO_QUERY.DELETE, params) as DocumentClient.DeleteItemOutput
}

/**
 * Convert an update object into dynamo's update params
 * @param tableName Name of table that contain item
 * @param itemId ID of item that need to be updated
 * @param updateObj Update's info of item
 * @credit trancongduynguyen
 */
export const convertToDynamoUpdate = (
  tableName: string,
  itemId: string,
  updateObj: object,
  expect: string[] = ['id']
): DocumentClient.UpdateItemInput => {
  const dynamoAttributeNames = {}
  const expressionAttributeValues = {}
  let updateExpression = 'set'
  for (const uKey of Object.keys(updateObj)) {
    if (expect.includes(uKey)) {
      continue
    }
    dynamoAttributeNames[`#${uKey}`] = uKey
    expressionAttributeValues[`:${uKey}`] = updateObj[uKey]
    let expression = `#${uKey} = :${uKey},`
    updateExpression += ` ${expression}`
  }
  expressionAttributeValues[`:updated_on`] = moment().unix()
  updateExpression += `updated_on = :updated_on`
  return {
    TableName: tableName,
    Key: { id: itemId },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: dynamoAttributeNames,
    ReturnValues: 'ALL_NEW'
  }
}
