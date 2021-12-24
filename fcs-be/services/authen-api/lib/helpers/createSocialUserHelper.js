import createError from 'http-errors'
import moment from 'moment'
import { DYNAMO_QUERY, USER_ROLE } from '../../../../const'
import * as dynamoDbLib from '../../../../libs/dynamodb-lib'

export async function createSocialUser (urn, status, type, secretKeys) {
  const socialUser = {
    id: urn,
    status: status,
    role: USER_ROLE.USER,
    creation_date: moment().unix()
  }
  const socialUserProfile = {
    id: urn,
    type: type,
    kyc: false,
    exist: true,
    lang: 'en',
    city: '',
    country: '',
    district: '',
    address: '',
    bookAllow: false,
    picture_url: [],
    licensePlate: '',
    avatar: ''
  }
  console.log(secretKeys.USER_SOCIAL_TABLE_NAME)
  try {
    await dynamoDbLib.call(DYNAMO_QUERY.PUT, {
      TableName: secretKeys.USER_SOCIAL_TABLE_NAME,
      Item: socialUser
    })
    await dynamoDbLib.call(DYNAMO_QUERY.PUT, {
      TableName: secretKeys.USER_SOCIAL_PROFILE_TABLE_NAME,
      Item: socialUserProfile
    })
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  return {
    user: socialUser,
    profile: socialUserProfile
  }
}
