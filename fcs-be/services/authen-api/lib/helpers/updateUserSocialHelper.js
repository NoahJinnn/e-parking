import * as dynamoDbLib from '../../../../libs/dynamodb-lib'
import { DYNAMO_QUERY } from '../../../../const'

export async function updateUserInfoByUrn (user, profile, secretKeys) {
  const newUserInfo = {
    ...profile,
    ...user
  }
  try {
    await dynamoDbLib
      .call(DYNAMO_QUERY.PUT, {
        TableName: secretKeys.USER_SOCIAL_PROFILE_TABLE_NAME,
        Item: newUserInfo
      })
      .promise()
    return newUserInfo
  } catch (error) {
    console.log(error)
    return null
  }
}
