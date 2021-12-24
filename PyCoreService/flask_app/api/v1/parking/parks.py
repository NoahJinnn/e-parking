import logging
from flasgger.utils import swag_from
from flask import Blueprint, request

from flask_app.utils import response_helper
from models import Park

logger = logging.getLogger()
parks_mod = Blueprint('parks', __name__)


@parks_mod.route('/<string:park_id>', methods=['GET'])
@swag_from('../swagger_doc/parks/item_get.yml')
def get_single_park(park_id):
    return response_helper.response_success({'park_id': park_id})


@parks_mod.route('', methods=['POST'])
@swag_from('../swagger_doc/parks/item_get.yml')
def add_single_park():
    owner_id = request.json.get('owner_id')
    address = request.json.get('address')
    available_cabin = request.json.get('available_cabin')
    balena_cloud_uuid = request.json.get('balena_cloud_uuid')
    closed_time = request.json.get('closed_time')
    fee_for_all_day = request.json.get('fee_for_all_day')
    fee_per_hour_for_day = request.json.get('fee_per_hour_for_day')
    tel = request.json.get('tel')
    kyc = request.json.get('kyc')
    image = request.json.get('image')

    invalid_request = (not owner_id or not address
                       or not tel
                       or not available_cabin
                       or not balena_cloud_uuid
                       or not closed_time
                       or not fee_for_all_day
                       or not fee_per_hour_for_day
                       or not tel
                       or (type(kyc) != bool and not kyc)
                       or not image)

    if invalid_request:
        return response_helper.validation_error(msg='not meet requirement')

    new_park = Park(
        owner_id=owner_id,
        address=address,
        tel=tel,
        available_cabin=available_cabin,
        balena_cloud_uuid=balena_cloud_uuid,
        closed_time=closed_time,
        fee_for_all_day=fee_for_all_day,
        fee_per_hour_for_day=fee_per_hour_for_day,
        kyc=kyc,
        image=image
    )
    print(dict(new_park))
    new_park.save()
    return response_helper.response_success(dict(new_park))


@parks_mod.route('', methods=['GET'])
@swag_from('../swagger_doc/parks/items_get.yml')
def get_all_parks():
    results = Park.scan()
    return response_helper.response_success([dict(result) for result in results])
