import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpErrorHandler from '@middy/http-error-handler'
import httpSecurityHeaders from '@middy/http-security-headers'
import cors from '@middy/http-cors'
import secretsManager from '@middy/secrets-manager'

export default (handler) =>
  middy(handler).use([
    httpSecurityHeaders(),
    secretsManager({
      cache: true,
      secrets: {
        AUTHENTICATION: 'dev/authentication'
      }
    }),
    httpJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
    cors()
  ])
