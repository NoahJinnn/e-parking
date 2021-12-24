import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'

import middy from '@middy/core'
import secretsManager from '@middy/secrets-manager'

// By default, API Gateway authorizations are cached (TTL) for 300 seconds.
// This policy will authorize all requests to the same API Gateway instance where the
// request is coming from, thus being efficient and optimising costs.
const generatePolicy = (principalId: string, methodArn: string) => {
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

async function auth (event: APIGatewayTokenAuthorizerEvent, context) {
  if (!event.authorizationToken) {
    throw new createError.InternalServerError()
  }
  const secretKeys = context.AUTHENTICATION as ISecretKeysObject
  const token = event.authorizationToken.replace('Bearer ', '')
  try {
    const claims = jwt.verify(token, secretKeys.JWT_KEY || process.env.JWT_KEY)
    console.log('claims', claims)
    const policy = generatePolicy(claims['id'], event.methodArn)
    console.log('policy', policy)

    return {
      ...policy,
      context: claims
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }
}

export const handler = middy(auth).use(
  secretsManager({
    cache: true,
    secrets: {
      AUTHENTICATION: 'dev/authentication'
    }
  })
)
