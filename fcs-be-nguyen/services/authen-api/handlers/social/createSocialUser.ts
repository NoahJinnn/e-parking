import jwt from 'jsonwebtoken'
import validator from '@middy/validator'
import createError from 'http-errors'
import { getUserById } from '../../lib/repository/getUser.repository'
import { createSocialUser } from '../../lib/helpers/createSocialUserHelper'
import commonMiddlewave from '@libs/commonMiddlewave'
import createUserSocialSchema from '../../lib/schema/social/createUserSocialSchema'
import { TOKEN_GENERATE_FAIL, USER_ALREADY_EXIST } from '@const/error'
import { success } from '@libs/response-lib'

const createSocialUserHandle = async (event, context) => {
  // "urn": "[telegram:392085130#kennydinh]",
  const secretKeys = context.AUTHENTICATION as ISecretKeysObject
  console.log(event.body)
  const { urn, status } = event.body
  let token: string
  let socialUser
  console.log(urn)
  const user = await getUserById(urn)
  if (user) {
    throw new createError.BadRequest(USER_ALREADY_EXIST)
  } else {
    // TODO: CREATE SOCIAL USER
    socialUser = await createSocialUser(urn, status)
  }

  try {
    token = jwt.sign(socialUser, secretKeys.JWT_KEY, { expiresIn: '1d' })
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(TOKEN_GENERATE_FAIL)
  }

  return success(
    {
      message: 'Create social user successfully',
      user: socialUser,
      token: token
    },
    201
  )
}

export const handler = commonMiddlewave(createSocialUserHandle, true).use(
  validator({
    inputSchema: createUserSocialSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
