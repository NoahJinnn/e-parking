import validator from '@middy/validator'
import commonMiddlewave from '@libs/commonMiddlewave'

import { updateUser } from '../../lib/repository/updateUser.repository'

import { success } from '@libs/response-lib'
import updatePartnerUserSchema from 'services/authen-api/lib/schema/updatePartnerUserSchema'

const updatePartnerUserHandle = async (event) => {
  try {
    const user = await updateUser(event.body)
    return success({
      message: 'Update user successfully',
      updatedUser: user
    })
  } catch (error) {
    throw error
  }
}

export const handler = commonMiddlewave(updatePartnerUserHandle, false).use(
  validator({
    inputSchema: updatePartnerUserSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
