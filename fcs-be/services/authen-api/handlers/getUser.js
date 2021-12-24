
import validator from '@middy/validator'
import createError from 'http-errors'
import commonMiddlewave from '../../../libs/commonMiddlewave'
import getUserSchema from '../lib/schema/getUserSchema'
import * as dynamoDbLib from '../../libs/dynamodb-lib'

async function getUserByPhone (event, context) {
  // event > contain all infor about request
  // context : metadata in lambda

  const { phone, status } = event.queryStringParameters

  let result

  const params = {
    TableName: process.env.USER_TABLE_NAME,
    IndexName: 'statusAndphone',
    KeyConditionExpression: '#status = :status AND phone = :phone ',
    ExpressionAttributeValues: {
      ':status': status,
      ':phone': phone
    },
    ExpressionAttributeNames: {
      '#status': 'status'
    }
  }

  try {
    result = await dynamoDbLib.call('query', params)
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(result.Items)
  }
}

export const handler = commonMiddlewave(getUserByPhone).use(validator({ inputSchema: getUserSchema, useDefaults: true }))
