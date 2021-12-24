import jwt from 'jsonwebtoken'

export const generateJwtByOtp = (payload: IUserToken, secretKey: string): string => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1d'
  })
  return token
}
