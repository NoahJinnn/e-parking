interface IUserBase {
  id: string
  userType: number
  status?: string
  creation_date?: number
}
interface IUserToken {
  id: string
  status: string
  creation_date: number
  phone?: string
  role?: string
  email?: string
  countryCode?: string
}

interface IEndUser extends IUserBase {
  phone: string
  countryCode: string
  name?: string
  email?: string
  firstName?: string
  lastName?: string
  birthday?: string
}
interface IPartnerUser extends IUserBase {
  role?: string
}

interface ISocialUser extends IUserBase {
  kyc?: boolean
  exist?: boolean
  lang?: string
  city?: string
  country?: string
  district?: string
  address?: string
  bookAllow?: boolean
  pictureUrl?: string[]
  licensePlate?: string
  avatar?: string
}

interface IUserUpdateInfo {
  id: string
  status?: string
  phone?: string
  countryCode?: string
  name?: string
  email?: string
  firstName?: string
  lastName?: string
  birthday?: string
  role?: string
  kyc?: boolean
  exist?: boolean
  lang?: string
  city?: string
  country?: string
  district?: string
  address?: string
  bookAllow?: boolean
  pictureUrl?: string[]
  licensePlate?: string
  avatar?: string
}
