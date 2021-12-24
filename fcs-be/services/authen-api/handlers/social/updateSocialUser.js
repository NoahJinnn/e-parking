import createError from 'http-errors'
import validator from '@middy/validator'
import updateSocialUserSchema from '../../lib/schema/social/updateSocialUserSchema'
import { getUserProfileByUrn } from '../../lib/helpers/getUserSocialHelper'
import { updateUserInfoByUrn } from '../../lib/helpers/updateUserSocialHelper'
import commonMiddlewave from '../../../../libs/commonMiddlewave'
import {
  ERROR_MESSAGE,
  UPDATE_SOCIAL_USER_FAIL
} from '../../../../const/error'
async function updateUser (event, context) {
  const secretKeys = context.AUTHENTICATION
  const { user } = event.body
  const authenUser = event.requestContext.authorizer
  console.log(user)
  console.log(authenUser)

  const { urn } = user
  if (!urn || urn !== authenUser.id) {
    throw new createError.BadRequest(ERROR_MESSAGE.USER_NOT_EXIST)
  }

  const profile = await getUserProfileByUrn(urn, secretKeys)

  const newUser = await updateUserInfoByUrn(user, profile, secretKeys)
  if (!newUser) {
    throw new createError.InternalServerError(UPDATE_SOCIAL_USER_FAIL)
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      newUser
    })
  }
}

export const handler = commonMiddlewave(updateUser).use(
  validator({
    inputSchema: updateSocialUserSchema
  })
)
