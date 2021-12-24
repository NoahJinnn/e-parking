import json
import os
from decimal import Decimal

import boto3

json_cache = []
seed_dir = os.getcwd() + '/../../tests/test_setup/seeders'
for file in os.listdir(seed_dir):
    if file.endswith(".json"):
        seed_path = os.path.join(seed_dir, file)
        with open(seed_path) as json_file:
            json_data = json.load(json_file, parse_float=Decimal)
            json_cache.append(json_data)


class SeederHelper(object):
    dynamodb = boto3.resource(
        'dynamodb',
        endpoint_url='http://localhost:8000',
        region_name='us-west-2'
    )

    def __init__(self):
        self.table_name = 'epg-parking-info-local'
        self.table = self.dynamodb.Table(self.table_name)

    def up(self):
        with self.table.batch_writer() as batch:
            for item in json_cache:
                for data in item:
                    batch.put_item(Item=data)

    def down(self):
        scan = self.table.scan()
        with self.table.batch_writer() as batch:
            for each in scan['Items']:
                batch.delete_item(Key={
                    'park_id': each['park_id'],
                    'owner_id': each['owner_id']
                })
