import validator from '@middy/validator'
import commonMiddlewave from '@libs/commonMiddlewave'
import getUserSchema from '../../lib/schema/getUserSchema'
import { getUserByPhone } from '../../lib/repository/getUser.repository'
import { USER_TYPE } from '@const/index'
import { success } from '@libs/response-lib'

const getEndUserHandle = async (event) => {
  const { phone, status } = event.queryStringParameters

  try {
    const result = await getUserByPhone(phone, status, USER_TYPE.END_USER)
    return success(result.Items)
  } catch (error) {
    console.log(error)
    throw error // handled by @middy/http-error-handler
  }
}

export const handler = commonMiddlewave(getEndUserHandle).use(
  validator({
    inputSchema: getUserSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
