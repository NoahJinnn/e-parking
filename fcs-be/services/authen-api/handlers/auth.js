import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import commonMiddlewave from '../../../libs/commonMiddlewave'
// By default, API Gateway authorizations are cached (TTL) for 300 seconds.
// This policy will authorize all requests to the same API Gateway instance where the
// request is coming from, thus being efficient and optimising costs.
const generatePolicy = (principalId, methodArn) => {
  const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*'

  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: apiGatewayWildcard
        }
      ]
    }
  }
}

async function auth (event, context) {
  if (!event.authorizationToken) {
    throw new createError.InternalServerError()
  }

  const token = event.authorizationToken.replace('Bearer ', '')
  const secretKeys = context.AUTHENTICATION
  try {
    const claims = jwt.verify(token, secretKeys.JWT_KEY)
    const policy = generatePolicy(claims.id, event.methodArn)
    console.log(claims)
    console.log(policy)

    return {
      ...policy,
      context: claims
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }
}

export const handler = commonMiddlewave(auth)
