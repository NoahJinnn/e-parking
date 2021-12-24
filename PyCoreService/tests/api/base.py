import os
import unittest

from tests.seeder_helper import SeederHelper

# TODO: Remove the logic to check environment in code
# We should use a config manager to check feature flag instead
os.environ['ENV'] = 'DEV'
os.environ['PARKING_DEVICE_TABLE'] = 'epg-parking-device-local'
os.environ['PARKING_INFO_TABLE'] = 'epg-parking-info-local'
os.environ['PARKING_INFO_TABLE_INDEX'] = 'park-index'


class BaseTestCase(unittest.TestCase):
    seeder_helper = SeederHelper()

    @classmethod
    def setUp(cls):
        from flask_app import app
        app.testing = True
        cls.app = app.test_client()
        cls.seeder_helper.up()
        cls._app = app

    def run(self, result=None):
        super().run(result)

    @classmethod
    def tearDown(cls):
        cls.seeder_helper.down()
