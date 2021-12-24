import createError from 'http-errors'
import validator from '@middy/validator'
// import { getUserById } from '../../lib/getUser.repository';
import updateSocialUserSchema from '../../lib/schema/social/updateSocialUserSchema'
import { updateUserInfoByUrn } from '../../lib/helpers/updateUserSocialHelper'
import commonMiddlewave from '@libs/commonMiddlewave'
import { ERROR_MESSAGE, UPDATE_SOCIAL_USER_FAIL } from '@const/error'
import { success } from '@libs/response-lib'

const updateUser = async (event, _context) => {
  const { user } = event.body
  const authenUser = event.requestContext.authorizer
  console.log(user)
  console.log(authenUser)

  const { urn } = user
  if (!urn || urn !== authenUser.id) {
    throw new createError.BadRequest(ERROR_MESSAGE.USER_NOT_EXIST)
  }

  // const profile = await getUserById(urn)

  const newUser = await updateUserInfoByUrn(user)
  if (!newUser) {
    throw new createError.InternalServerError(UPDATE_SOCIAL_USER_FAIL)
  }

  return success(newUser)
}

export const handler = commonMiddlewave(updateUser, true).use(
  validator({
    inputSchema: updateSocialUserSchema
  })
)
