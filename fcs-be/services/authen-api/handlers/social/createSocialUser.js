import jwt from 'jsonwebtoken'
import validator from '@middy/validator'
import createError from 'http-errors'
import { getUserByUrn } from '../../lib/helpers/getUserSocialHelper'
import { createSocialUser } from '../../lib/helpers/createSocialUserHelper'
import commonMiddlewave from '../../../../libs/commonMiddlewave'
import createUserSocialSchema from '../../lib/schema/social/createUserSocialSchema'
import {
  TOKEN_GENERATE_FAIL,
  USER_ALREADY_EXIST
} from '../../../../const/error'

async function createSocialUserHandle (event, context) {
  // "urn": "[telegram:392085130#kennydinh]",
  const secretKeys = context.AUTHENTICATION
  const { urn, status, type } = event.body
  let token
  let socialUser
  let socialProfileUser
  let message
  console.log(urn)
  // TODO: GET USER BY URN
  const user = await getUserByUrn(urn, secretKeys)
  console.log(user)
  if (user) {
    throw new createError.BadRequest(USER_ALREADY_EXIST)
  } else {
    // TODO: CREATE SOCIAL USER
    const { user, profile } = await createSocialUser(
      urn,
      status,
      type,
      secretKeys
    )
    socialUser = user
    socialProfileUser = profile
    message = 'Create social user success'
  }

  try {
    console.log(socialUser)
    token = jwt.sign(socialUser, secretKeys.JWT_KEY, { expiresIn: '1d' })
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(TOKEN_GENERATE_FAIL)
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message,
      user: socialUser,
      profile: socialProfileUser,
      token: token
    })
  }
}

export const handler = commonMiddlewave(createSocialUserHandle).use(
  validator({
    inputSchema: createUserSocialSchema,
    useDefaults: true
  })
)
