import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpErrorHandler from '@middy/http-error-handler'
import httpSecurityHeaders from '@middy/http-security-headers'
import cors from '@middy/http-cors'
import secretsManager from '@middy/secrets-manager'

/**
 * @param {APIGatewayProxyHandler} handler aws-lambda handler
 * @param {boolean} isUseSecretsManager enable secrets-manager middleware.
 */
export default (handler, isUseSecretsManager = false) => {
  const middyHandler = middy(handler)
  if (isUseSecretsManager) {
    middyHandler.use(
      secretsManager({
        cache: true,
        secrets: {
          AUTHENTICATION: 'dev/authentication'
        }
      })
    )
  }
  middyHandler.use([httpJsonBodyParser(), httpErrorHandler(), httpEventNormalizer(), httpSecurityHeaders(), cors()])
  return middyHandler
}
