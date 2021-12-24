import json
import logging
import os
import time
import uuid

import boto3
import dynamo_json
import pyotp

from flask_app.utils import DecimalEncoder, SnsWrapper, DBUtil as dbutil, PinPointClient, Request, response_helper
from flask_app.utils.response_helper import response_success

logger = logging.getLogger()

dynamodb = boto3.resource('dynamodb')

sns_resource = boto3.resource('sns')

otp_secret = os.environ['OTP_SECRECT']

otp_expired_limit: str = os.environ['OTP_EXPIRED_LIMIT']

# otp_secrect = 'epark2020'

parking_table_name = os.environ['PARKING_SESSION_TABLE']
# TODO get from deployment serverless
topic_arn = 'arn:aws:sns:us-east-1:064877420767:eparking_sns'

# # init database
dbclient = dbutil.create_dynamodb_client(os.environ['REGION'])

# define status of parking session
WAITING_FOR_CHECKIN = 0
CHECKED_IN = 1
COMPLETED = 2
CANCELED = 4

PARKING_SMS_MESSAGE = {
    'checking_otp': 'Hi, your checking OTP is {}',
    'checkout_otp': 'Hi, your checkout OTP is {}'
}

OTP_SECRET = {
    'checking_otp': 'CHECKING{}',
    'checkout_otp': 'CHECKOUT{}'
}


def checkin(event, context):
    checking_secret = OTP_SECRET['checking_otp'].format(otp_secret)
    hotp = pyotp.HOTP(checking_secret)
    sns_wrapper = SnsWrapper(sns_resource)

    pinpoint_client = PinPointClient(region="ap-southeast-1")
    data = json.loads(event['body'])
    if 'park_id' not in data or 'user_id' not in data:
        logger.error("Validation Failed")
        return response_helper.bad_request(msg="Couldn't create the checking session item.")

    timestamp = int(time.time())

    phone_number = '+817041363920'  # TODO get phone number from user table

    item = {
        'park_id': data['park_id'],
        'parking_session_id': str(uuid.uuid1()),
        'text': data['text'],
        'user_id': data['user_id'],
        'status': str(WAITING_FOR_CHECKIN),
        'checking_date': str(timestamp),
        'updatedAt': str(timestamp)
    }

    checking_otp = hotp.at(timestamp)
    print("otp is: ", checking_otp)

    message = PARKING_SMS_MESSAGE['checking_otp'].format(checking_otp)
    pinpoint_client.send_sms(message=message, target_number=phone_number)

    # sns_wrapper.publish_text_message(subject='E-parking', phone_number=phone_number, message=message)
    # write the checking session to the database
    put_item = dbutil.create_put_item_input(table_name=parking_table_name, item=dynamo_json.marshall(item))
    dbutil.execute_put_item(dynamodb_client=dbclient, input=put_item)
    return response_helper.response_success(json.dumps(item, cls=DecimalEncoder))


def verify(event, context):
    logger.info("in verify method")
    current_time = time.time()
    data = json.loads(event['body'])

    secret = ""
    if 'park_id' not in data or 'user_id' not in data or 'otp' not in data or 'session_id' not in data or 'type' not in data:
        logger.error("Validation Failed")
        return response_helper.bad_request(msg="request not meet requirement")
    if data['type'] and data['type'] == Request.CHECKIN:
        print("type checkin")
        secret = OTP_SECRET['checking_otp'].format(otp_secret)
    elif type == Request.CHECKOUT:
        print("type checkout")
        secret = OTP_SECRET['checkout_otp'].format(otp_secret)
    hotp = pyotp.HOTP(secret)

    query = dbutil.create_get_item_input(table_name=parking_table_name,
                                         partion_key=data['park_id'], sort_key=data['session_id'])

    response_item = dbutil.execute_get_item(dynamodb_client=dbclient, input=query)['Item']
    item = dynamo_json.unmarshall(response_item)
    request_time = item['checking_date']

    print('item is: ', item)
    print(current_time)
    print(request_time)
    print(int(otp_expired_limit * 60))

    if int(current_time) - int(request_time) >= int(otp_expired_limit * 60):
        if hotp.verify(data['otp'], int(request_time)):
            print('otp is ok')
            new_item = {
                'park_id': item['park_id'],
                'parking_session_id': item['parking_session_id'],
                'text': item['text'],
                'user_id': item['user_id'],
                'status': str(CHECKED_IN),
                'checking_date': item['checking_date'],
                'updatedAt': str(time.time())
            }

            put_item = dbutil.create_put_item_input(table_name=parking_table_name,
                                                    item=dynamo_json.marshall(new_item))

            # update parking session to the database
            dbutil.execute_put_item(dynamodb_client=dbclient, input=put_item)
            return response_helper.response_success(json.dumps(item, cls=DecimalEncoder))
        else:
            logger.error("otp is not correct")
            return response_success("otp is not correct")
    else:
        logger.error('otp is expired')
        return response_helper.bad_request('otp is expired')


def checkout(event, context):
    logger.info("in checkout method")
    return response_helper.response_success("ok")


def get_parking_info(event, context):
    park_id = event['pathParameters']['id']
    return response_helper.response_success(park_id)


def check_otp(event, context):
    print(event)
    return response_helper.response_success("ok")
