import createError from 'http-errors'

import { USER_TYPE } from '@const/index'

import { createUser } from '../repository/createUser.repository'

export const createSocialUser = async (urn: string, status: string): Promise<ISocialUser> => {
  const socialUser: ISocialUser = {
    id: urn,
    status,
    userType: USER_TYPE.SOCIAL_USER,
    kyc: false,
    exist: true,
    lang: 'en',
    city: '',
    country: '',
    district: '',
    address: '',
    bookAllow: false,
    pictureUrl: [],
    licensePlate: '',
    avatar: ''
  }
  try {
    await createUser(socialUser)
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  return socialUser
}
