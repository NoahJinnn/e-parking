import logging
import uuid

from flasgger.utils import swag_from
from flask import Blueprint, request

from flask_app.utils import response_helper
from models import Device

logger = logging.getLogger()
devices_mod = Blueprint('devices', __name__)


@devices_mod.route('/<string:device_id>', methods=['GET'])
@swag_from('../swagger_doc/devices/item_get.yml')
def get_single_device(device_id):
    return response_helper.response_success({'device_id': device_id})


@devices_mod.route('', methods=['POST'])
@swag_from('../swagger_doc/devices/item_post.yml')
def add_single_device():
    park_id = request.json.get('park_id')
    balena_UUID = request.json.get('balena_UUID')
    case_UUID = request.json.get('case_UUID')
    custom_latitude = request.json.get('custom_latitude')
    custom_longitude = request.json.get('custom_longitude')
    device_name = request.json.get('device_name')
    device_type = request.json.get('device_type')
    ip_address = request.json.get('ip_address')
    mac_address = request.json.get('mac_address')
    if not park_id or not balena_UUID \
            or not case_UUID or not custom_longitude \
            or not custom_latitude or not device_type \
            or not device_name or not ip_address or not mac_address:
        return response_helper.bad_request(msg='not meet requirement')
    my_device = Device(
        park_id=park_id,
        device_id=str(uuid.uuid1()),
        balena_UUID=balena_UUID,
        case_UUID=case_UUID,
        custom_latitude=custom_latitude,
        custom_longitude=custom_longitude,
        device_name=device_name,
        device_type=device_type,
        ip_address=ip_address,
        mac_address=mac_address
    )
    my_device.save()
    return response_helper.response_success(dict(my_device))


@devices_mod.route('', methods=['GET'])
@swag_from('../swagger_doc/devices/items_get.yml')
def get_all_devices():
    results = Device.scan()
    return response_helper.response_success([dict(result) for result in results])
