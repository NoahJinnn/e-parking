import AWS from './aws-sdk'
import config from '../config'

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export function call (action, params) {
  // Parameterize table names with stage name
  console.log(`${params.TableName}-${config.resourcesStage}`)
  return dynamoDb[action]({
    ...params,
    TableName: `${params.TableName}-${config.resourcesStage}`
  }).promise()
}
