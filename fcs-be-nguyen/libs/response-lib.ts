/**
 * Generate an success response with code 200
 * @param body Message or data to response
 */
export function success (body: object | string, statusCode = 200) {
  return buildResponse(statusCode, body)
}

/**
 * Generate an failed response with code 500
 * @param body Message or data to response
 */
export function failure (body: object | string) {
  return buildResponse(500, body)
}

function buildResponse (statusCode: number, body: object | string) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(typeof body === 'string' ? { message: body } : body)
  }
}
