import validator from '@middy/validator'
import commonMiddlewave from '@libs/commonMiddlewave'

import { deleteUser } from '../lib/repository/deleteUser.repository'

import { success } from '@libs/response-lib'

const deleteUserHandle = async (event) => {
  try {
    const { id } = event.pathParameters
    let user = await deleteUser(id)
    return success({
      message: `Delete user ${id} successfully`,
      deletedUser: user
    })
  } catch (error) {
    throw error
  }
}

export const handler = commonMiddlewave(deleteUserHandle, false).use(
  validator({
    ajvOptions: {
      useDefaults: true
    }
  })
)
