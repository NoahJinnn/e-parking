import json
import random

from tests.api.base import BaseTestCase

invalid_uuid = '00000000-0000-0000-0000-000000000000'
# TODO: Seeder to have a parking Id
parking_id = '1003656c-a4de-11eb-8b26-fd25ab6ce1b7'


class TestParkingApi(BaseTestCase):
    root_api = '/parks'

    def test_get_all_parking(self):
        result = self.app.get(self.root_api)
        response_json = json.loads(result.get_data(as_text=True))

        self.assertEqual(result.status_code, 200)
        self.assertTrue('data' in response_json)
        self.assertGreaterEqual(len(response_json['data']), 1)

    def test_get_single_parking_not_found_invalid_uuid(self):
        result = self.app.get(f'{self.root_api}/invalid-uuid')
        response_json = json.loads(result.get_data(as_text=True))

        self.assertTrue('data' in response_json)
        self.assertEqual(result.status_code, 404)

    def test_get_single_parking_not_found(self):
        result = self.app.get(f'{self.root_api}/{invalid_uuid}')
        response_json = json.loads(result.get_data(as_text=True))

        self.assertTrue('data' in response_json)
        self.assertEqual(result.status_code, 404)

    def test_get_single_parking_ok(self):
        result = self.app.get(f'{self.root_api}/{parking_id}')
        response_json = json.loads(result.get_data(as_text=True))

        self.assertTrue('data' in response_json)
        self.assertEqual(result.status_code, 200)
        self.assertEqual(response_json['data']['id'], parking_id)

    def test_post_parking_fail_validate(self):
        valid_post_body = {
            'owner_id': 'random',
            'address': 'random',
            'available_cabin': 'random',
            'balena_cloud_uuid': 'random',
            'closed_time': 'random',
            'fee_for_all_day': 'random',
            'fee_per_hour_for_day': 'random',
            'tel': 'random',
            'kyc': 'random',
            'image': 'random',
        }

        # Missing any fields above will result in request validation error
        for key in valid_post_body:
            invalid_post_body = json.loads(json.dumps(valid_post_body))
            invalid_post_body.pop(key)
            result = self.app.post(self.root_api, json=invalid_post_body)
            response_text = result.get_data(as_text=True)

            self.assertEqual(result.status_code, 400)
            self.assertIn('Request validation error', response_text)

    def test_post_parking_ok(self):
        valid_post_body = {
            'owner_id': 'random',
            'address': 'random',
            'available_cabin': random.randint(1, 10),
            'balena_cloud_uuid': 'random',
            'closed_time': 'random',
            'fee_for_all_day': 5000,
            'fee_per_hour_for_day': [3000, 6000],
            'tel': 'random',
            'kyc': True,
            'image': 'random',
        }

        # Missing any fields above will result in request validation error
        result = self.app.post(self.root_api, json=valid_post_body)
        response_json = json.loads(result.get_data(as_text=True))

        self.assertEqual(result.status_code, 200)
        self.assertTrue('data' in response_json)
