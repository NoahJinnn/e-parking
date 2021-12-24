import moment from 'moment'

export const generateDynamoUpdateSchema = (id, updateInfo, tableName) => {
  const dynamoAttributeNames = {}
  const expressionAttributeValues = {}
  let updateExpression = 'set'
  for (const uKey of Object.keys(updateInfo)) {
    dynamoAttributeNames[`#${uKey}`] = uKey
    expressionAttributeValues[`:${uKey}`] = updateInfo[uKey]
    let expression = `#${uKey} = :${uKey},`
    updateExpression += ` ${expression}`
  }

  expressionAttributeValues[`:updated_on`] = moment().unix()
  updateExpression += `updated_on = :updated_on`

  const param = {
    TableName: tableName,
    Key: { id },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: dynamoAttributeNames,
    ReturnValues: 'ALL_NEW'
  }
  return param
}
