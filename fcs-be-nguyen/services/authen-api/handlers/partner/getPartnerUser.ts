import validator from '@middy/validator'
import commonMiddlewave from '@libs/commonMiddlewave'
import getUserSchema from '../../lib/schema/getUserSchema'
import { getUserByPhone } from '../../lib/repository/getUser.repository'
import { USER_TYPE } from '@const/index'
import { success } from '@libs/response-lib'

const getPartnerUserHandle = async (event) => {
  // event > contain all infor about request

  try {
    const { phone, status } = event.queryStringParameters
    const result = await getUserByPhone(phone, status, USER_TYPE.PARTNER_USER)
    return success(result.Items)
  } catch (error) {
    throw error // handled by @middy/http-error-handler
  }
}

export const handler = commonMiddlewave(getPartnerUserHandle).use(
  validator({
    inputSchema: getUserSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
