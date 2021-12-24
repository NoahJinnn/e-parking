import jwt from 'jsonwebtoken'
import validator from '@middy/validator'
import createError from 'http-errors'
import {
  getUserByUrn,
  getUserProfileByUrn
} from '../../lib/helpers/getUserSocialHelper'
import getUserSocialSchema from '../../lib/schema/social/getUserSocialSchema'
import { TOKEN_GENERATE_FAIL, USER_NOT_EXIST } from '../../../../const/error'
import commonMiddlewave from '../../../../libs/commonMiddlewave'
async function createSocialUserHandle (event, context) {
  // "urn": "[telegram:392085130#kennydinh]",
  const secretKeys = context.AUTHENTICATION
  const { urn } = event.body
  let token
  // TODO: GET USER BY URN
  const user = await getUserByUrn(urn, secretKeys)
  const profile = await getUserProfileByUrn(urn, secretKeys)
  console.log(user)
  if (!user) {
    throw new createError.BadRequest(USER_NOT_EXIST)
  }
  try {
    console.log(user)
    token = jwt.sign(user, secretKeys.JWT_KEY, { expiresIn: '1d' })
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(TOKEN_GENERATE_FAIL)
  }
  return {
    statusCode: 201,
    body: JSON.stringify({
      user,
      profile,
      token
    })
  }
}

export const handler = commonMiddlewave(createSocialUserHandle).use(
  validator({
    inputSchema: getUserSocialSchema,
    useDefaults: true
  })
)
