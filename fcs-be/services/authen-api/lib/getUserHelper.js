import * as dynamoDbLib from '../../../libs/dynamodb-lib'
import { DYNAMO_QUERY, USER_STATUS } from '../../../const'

export async function getUserByPhone (phoneNumber, secretKeys) {
  let result

  const params = {
    TableName: secretKeys.USER_TABLE_NAME,
    IndexName: 'statusAndphone',
    KeyConditionExpression: '#status = :status AND phone = :phone ',
    ExpressionAttributeValues: {
      ':status': USER_STATUS.ACTIVE,
      ':phone': phoneNumber
    },
    ExpressionAttributeNames: {
      '#status': 'status'
    }
  }

  try {
    result = await dynamoDbLib.call(DYNAMO_QUERY.QUERY, params)
  } catch (error) {
    console.log(error)
    return []
  }
  return result.Items
}
