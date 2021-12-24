import * as dynamoDbLib from '../../../../libs/dynamodb-lib'
import { DYNAMO_QUERY } from '../../../../const'

export async function getUserByUrn (urn, secretKeys) {
  let result

  const params = {
    TableName: secretKeys.USER_SOCIAL_TABLE_NAME,
    Key: { id: urn }
  }

  try {
    result = await dynamoDbLib.call(DYNAMO_QUERY.GET, params)
  } catch (error) {
    console.log(error)
    return null
  }
  return result.Item
}

export async function getUserProfileByUrn (urn, secretKeys) {
  let result

  const params = {
    TableName: secretKeys.USER_SOCIAL_PROFILE_TABLE_NAME,
    Key: { id: urn }
  }

  try {
    result = await dynamoDbLib.call(DYNAMO_QUERY.GET, params)
  } catch (error) {
    console.log(error)
    return null
  }
  return result.Item
}
