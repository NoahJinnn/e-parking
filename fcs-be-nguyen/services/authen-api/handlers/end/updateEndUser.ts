import validator from '@middy/validator'
import commonMiddlewave from '@libs/commonMiddlewave'

import { updateUser } from '../../lib/repository/updateUser.repository'

import { success } from '@libs/response-lib'
import updateEndUserSchema from 'services/authen-api/lib/schema/updateEndUserSchema'

const updateEndUserHandle = async (event) => {
  try {
    const user = await updateUser(event.body)
    return success({
      message: 'Update user successfully',
      updatedUser: user
    })
  } catch (error) {
    throw error // handled by @middy/http-error-handler
  }
}

export const handler = commonMiddlewave(updateEndUserHandle, false).use(
  validator({
    inputSchema: updateEndUserSchema,
    ajvOptions: {
      useDefaults: true
    }
  })
)
