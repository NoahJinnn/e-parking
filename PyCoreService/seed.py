import boto3

ddb_options = {
    'endpoint_url': 'http://localhost:8000',
    'region_name': 'us-west-2'
}

ddb = boto3.resource('dynamodb', **ddb_options)
ddb_client = boto3.client('dynamodb', **ddb_options)

# List all table
current_tables = list(ddb.tables.all())
print(f'List of current tables: {current_tables}')

# Tables we want to create (Based on serverless.yml)
TABLE_DEF_USERS = {
    'AttributeDefinitions': [
        {
            'AttributeName': 'id',
            'AttributeType': 'S'
        }
    ],
    'BillingMode': 'PROVISIONED',
    # 'GlobalSecondaryIndexes': [],
    'KeySchema': [
        {
            'AttributeName': 'id',
            'KeyType': 'HASH'
        }
    ],
    # 'LocalSecondaryIndexes': [],
    'ProvisionedThroughput': {
        'ReadCapacityUnits': 1,
        'WriteCapacityUnits': 1
    },
    'SSESpecification': {
        'Enabled': False
    },
    'StreamSpecification': {
        'StreamEnabled': False
    },
    'TableName': 'epg-user-local',
    'Tags': [],
}

TABLE_DEF_PARKING_SESSION = {
    'AttributeDefinitions': [
        {
            'AttributeName': 'park_id',
            'AttributeType': 'S'
        },
        {
            'AttributeName': 'parking_session_id',
            'AttributeType': 'S'
        }
    ],
    'BillingMode': 'PROVISIONED',
    # 'GlobalSecondaryIndexes': [],
    'KeySchema': [
        {
            'AttributeName': 'park_id',
            'KeyType': 'HASH'
        },
        {
            'AttributeName': 'parking_session_id',
            'KeyType': 'RANGE'
        }
    ],
    # 'LocalSecondaryIndexes': [],
    'ProvisionedThroughput': {
        'ReadCapacityUnits': 1,
        'WriteCapacityUnits': 1
    },
    'SSESpecification': {
        'Enabled': False
    },
    'StreamSpecification': {
        'StreamEnabled': False
    },
    'TableName': 'epg-parking-session-local',
    'Tags': []
}

TABLE_DEF_PARKING_DEVICE = {
    'AttributeDefinitions': [
        {
            'AttributeName': 'park_id',
            'AttributeType': 'S'
        },
        {
            'AttributeName': 'device_id',
            'AttributeType': 'S'
        }
    ],
    'BillingMode': 'PROVISIONED',
    # 'GlobalSecondaryIndexes': [],
    'KeySchema': [
        {
            'AttributeName': 'park_id',
            'KeyType': 'HASH'
        },
        {
            'AttributeName': 'device_id',
            'KeyType': 'RANGE'
        }
    ],
    # 'LocalSecondaryIndexes': [],
    'ProvisionedThroughput': {
        'ReadCapacityUnits': 1,
        'WriteCapacityUnits': 1
    },
    'SSESpecification': {
        'Enabled': False
    },
    'StreamSpecification': {
        'StreamEnabled': False
    },
    'TableName': 'epg-parking-device-local',
    'Tags': []
}

TABLE_DEF_PARKING_INFO = {
    'AttributeDefinitions': [
        {
            'AttributeName': 'park_id',
            'AttributeType': 'S'
        },
        {
            'AttributeName': 'owner_id',
            'AttributeType': 'S'
        }
    ],
    'BillingMode': 'PAY_PER_REQUEST',
    'GlobalSecondaryIndexes': [
        {
            'IndexName': "park-index",
            'KeySchema': [
                {
                    'AttributeName': 'park_id',
                    'KeyType': 'HASH'
                },
            ],
            'Projection': {
                'ProjectionType': "ALL"
            },
            'ProvisionedThroughput': {
                'ReadCapacityUnits': 1,
                'WriteCapacityUnits': 1
            }
        }
    ],
    'KeySchema': [
        {
            'AttributeName': 'owner_id',
            'KeyType': 'HASH'
        },
        {
            'AttributeName': 'park_id',
            'KeyType': 'RANGE'
        }
    ],
    # 'LocalSecondaryIndexes': [],
    'ProvisionedThroughput': {
        'ReadCapacityUnits': 1,
        'WriteCapacityUnits': 1
    },
    'SSESpecification': {
        'Enabled': False
    },
    'StreamSpecification': {
        'StreamEnabled': False
    },
    'TableName': 'epg-parking-info-local',
    'Tags': []
}


def run():
    # Delete tables
    try:
        ddb_client.delete_table(TableName=TABLE_DEF_USERS['TableName'])
        print(f'Deleted table {TABLE_DEF_USERS["TableName"]}')
    except:
        pass

    try:
        ddb_client.delete_table(TableName=TABLE_DEF_PARKING_SESSION['TableName'])
        print(f'Deleted table {TABLE_DEF_PARKING_SESSION["TableName"]}')
    except:
        pass

    try:
        ddb_client.delete_table(TableName=TABLE_DEF_PARKING_DEVICE['TableName'])
        print(f'Deleted table {TABLE_DEF_PARKING_DEVICE["TableName"]}')
    except:
        pass

    try:
        ddb_client.delete_table(TableName=TABLE_DEF_PARKING_INFO['TableName'])
        print(f'Deleted table {TABLE_DEF_PARKING_INFO["TableName"]}')
    except:
        pass

    # Create tables
    try:
        ddb.create_table(**TABLE_DEF_USERS)
        print(f'Created table {TABLE_DEF_USERS["TableName"]}')
    except Exception as e:
        print(e)
        print(f'Error Creating {TABLE_DEF_USERS}')

    try:
        ddb.create_table(**TABLE_DEF_PARKING_SESSION)
        print(f'Created table {TABLE_DEF_PARKING_SESSION["TableName"]}')
    except Exception as e:
        print(e)
        print(f'Error Creating {TABLE_DEF_PARKING_SESSION}')

    try:
        ddb.create_table(**TABLE_DEF_PARKING_DEVICE)
        print(f'Created table {TABLE_DEF_PARKING_DEVICE["TableName"]}')
    except Exception as e:
        print(e)
        print(f'Error Creating {TABLE_DEF_PARKING_DEVICE}')

    try:
        ddb.create_table(**TABLE_DEF_PARKING_INFO)
        print(f'Created table {TABLE_DEF_PARKING_INFO["TableName"]}')
    except Exception as e:
        print(e)
        print(f'Error Creating {TABLE_DEF_PARKING_INFO}')


if __name__ == '__main__':
    run()
