# Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# This file is licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License. A copy of
# the License is located at
#
# http:#aws.amazon.com/apache2.0/
#
# This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
# CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.


import boto3
from botocore.exceptions import ClientError

# The AWS Region that you want to use to send the message. For a list of
# AWS Regions where the Amazon Pinpoint API is available, see
# https://docs.aws.amazon.com/pinpoint/latest/apireference/
region = "us-east-1"

# The phone number or short code to send the message from. The phone number
# or short code that you specify has to be associated with your Amazon Pinpoint
# account. For best results, specify long codes in E.164 format.
originationNumber = "+18559682217"

# The recipient's phone number.  For best results, you should specify the
# phone number in E.164 format.
destinationNumber = ""

# # The content of the SMS message.
# message = ("This is a sample message sent from Amazon Pinpoint by using the "
#            "AWS SDK for Python (Boto 3).")

# The Amazon Pinpoint project/application ID to use when you send this message.
# Make sure that the SMS channel is enabled for the project or application
# that you choose.
applicationId = "d6fde689729e4359978422df87e6c0f8"

# The type of SMS message that you want to send. If you plan to send
# time-sensitive content, specify TRANSACTIONAL. If you plan to send
# marketing-related content, specify PROMOTIONAL.
messageType = "TRANSACTIONAL"

# The registered keyword associated with the originating short code.
registeredKeyword = "myKeyword"

# The sender ID to use when sending the message. Support for sender ID
# varies by country or region. For more information, see
# https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-sms-countries.html
senderId = "MySenderID"


# Create a new client and specify a region.
# client =

class PinPointClient:

    def __init__(self, region):
        self.client = boto3.client('pinpoint', region_name=region)

    def send_sms(self, message, target_number):
        try:
            response = self.client.send_messages(
                ApplicationId=applicationId,
                MessageRequest={
                    'Addresses': {
                        target_number: {
                            'ChannelType': 'SMS'
                        }
                    },
                    'MessageConfiguration': {
                        'SMSMessage': {
                            'Body': message,
                            # 'Keyword': registeredKeyword,
                            'MessageType': messageType,
                            'OriginationNumber': originationNumber,
                            # 'SenderId': senderId
                        }
                    }
                }
            )

        except ClientError as e:
            print(e)
            print(e.response['Error']['Message'])
        else:
            print(response)
            # print("Message sent! Message ID: "
            #       + response['MessageResponse']['Result'][destinationNumber]['MessageId'])
