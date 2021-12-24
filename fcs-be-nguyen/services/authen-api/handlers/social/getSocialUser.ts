import jwt from 'jsonwebtoken'
import validator from '@middy/validator'
import createError from 'http-errors'
import { getUserById } from '../../lib/repository/getUser.repository'
import getUserSocialSchema from '../../lib/schema/social/getUserSocialSchema'
import { TOKEN_GENERATE_FAIL, USER_NOT_EXIST } from '@const/error'
import commonMiddlewave from '@libs/commonMiddlewave'
import { success } from '@libs/response-lib'

const getSocialUserHandle = async (event, context) => {
  // "urn": "[telegram:392085130#kennydinh]",
  const secretKeys = context.AUTHENTICATION as ISecretKeysObject
  const { urn } = event.body
  let token
  const user = await getUserById(urn)
  console.log('Get social user successfully', user)
  if (!user) {
    throw new createError.BadRequest(USER_NOT_EXIST)
  }
  try {
    token = jwt.sign(user, secretKeys.JWT_KEY, { expiresIn: '1d' })
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(TOKEN_GENERATE_FAIL)
  }

  // TODO: Return 201 status for this response
  return success({
    user,
    token
  })
}

export const handler = commonMiddlewave(getSocialUserHandle, true).use(
  validator({
    inputSchema: getUserSocialSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
