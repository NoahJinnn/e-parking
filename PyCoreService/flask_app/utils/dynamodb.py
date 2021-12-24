import boto3
from botocore.exceptions import ClientError

ERROR_HELP_STRINGS = {
    # Common Errors
    'InternalServerError': 'Internal Server Error, generally safe to retry with exponential back-off',
    'ProvisionedThroughputExceededException': 'Request rate is too high. If you\'re using a custom retry strategy make sure to retry with exponential back-off.' +
                                              'Otherwise consider reducing frequency of requests or increasing provisioned capacity for your table or secondary index',
    'ResourceNotFoundException': 'One of the tables was not found, verify table exists before retrying',
    'ServiceUnavailable': 'Had trouble reaching DynamoDB. generally safe to retry with exponential back-off',
    'ThrottlingException': 'Request denied due to throttling, generally safe to retry with exponential back-off',
    'UnrecognizedClientException': 'The request signature is incorrect most likely due to an invalid AWS access key ID or secret key, fix before retrying',
    'ValidationException': 'The input fails to satisfy the constraints specified by DynamoDB, fix input before retrying',
    'RequestLimitExceeded': 'Throughput exceeds the current throughput limit for your account, increase account level throughput before retrying',
}


def handle_error(error):
    error_code = error.response['Error']['Code']
    error_message = error.response['Error']['Message']

    error_help_string = ERROR_HELP_STRINGS[error_code]

    print('[{error_code}] {help_string}. Error message: {error_message}'
          .format(error_code=error_code,
                  help_string=error_help_string,
                  error_message=error_message))


class DBUtil:
    """Encapsulates Amazon SNS topic and subscription functions."""

    @staticmethod
    def create_get_item_input(table_name: str, partion_key=None, sort_key=None, *args):
        return {
            "TableName": table_name,
            "Key": {
                partion_key: {"S": partion_key},
                sort_key: {"S": sort_key}
            }
        }

    def execute_get_item(dynamodb_client, input):
        try:
            response = dynamodb_client.get_item(**input)
            print("Successfully get item.")
            # Handle response
            return response
        except ClientError as error:
            handle_error(error)
        except BaseException as error:
            print("Unknown error while getting item: " +
                  error.response['Error']['Message'])

    def create_dynamodb_client(region="us-east-1"):
        return boto3.client("dynamodb", region_name=region)

    @staticmethod
    def create_put_item_input(table_name: str, item):
        return {
            "TableName": table_name,
            "Item": item
        }

    def execute_put_item(dynamodb_client, input):
        try:
            response = dynamodb_client.put_item(**input)
            print("Successfully put item.")
            print(response)
        except ClientError as error:
            handle_error(error)
        except BaseException as error:
            print(error)
            print("Unknown error while putting item: " + error.response['Error']['Message'])

    def create_scan_input(table_name):
        return {
            "TableName": table_name
        }

    def execute_scan(dynamodb_client, input):
        try:
            response = dynamodb_client.scan(**input)
            print("Scan successful.")
            print(response)
            # Handle response
            return response['Items']
        except ClientError as error:
            handle_error(error)
        except BaseException as error:
            print("Unknown error while scanning: " + error.response['Error']['Message'])

    @staticmethod
    def create_query_input(table_name, partion_key, partion_value, sort_key=None, sort_value=None, index_name=None):
        key_express = ''
        express_att_name = ''
        express_value = ''
        query_item = {}
        if sort_key:
            key_express = "#eb440 = :eb440 And #eb441 = :eb441"
            express_att_name = {"#eb440": partion_key, "#eb441": sort_key}
            express_value = {":eb440": {"S": partion_value}, ":eb441": {"S": sort_value}}
        else:
            key_express = "#eb440 = :eb440"
            express_att_name = {"#eb440": partion_key}
            express_value = {":eb440": {"S": partion_value}}

        if index_name:
            query_item['IndexName'] = index_name

        query_item['TableName'] = table_name
        query_item['KeyConditionExpression'] = key_express
        query_item['ExpressionAttributeNames'] = express_att_name
        query_item['ExpressionAttributeValues'] = express_value

        return query_item

    @staticmethod
    def execute_query(dynamodb_client, input):
        try:
            response = dynamodb_client.query(**input)
            print("Query successful.")
            return response['Items']
        except ClientError as error:
            handle_error(error)
        except BaseException as error:
            print("Unknown error while querying: " + error.response['Error']['Message'])
