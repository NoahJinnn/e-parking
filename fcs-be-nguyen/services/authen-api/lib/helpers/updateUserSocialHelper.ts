import * as dynamoDbLib from '@libs/dynamodb-lib'
// TODO: Refract to apply new DB structure
export const updateUserInfoByUrn = async (user: ISocialUser): Promise<ISocialUser> => {
  const newUserInfo = {
    ...user
  }
  try {
    await dynamoDbLib.callPut({
      TableName: process.env.USER_SOCIAL_PROFILE_TABLE_NAME,
      Item: newUserInfo
    })
    return newUserInfo
  } catch (error) {
    console.log(error)
    return null
  }
}
