import os
from datetime import datetime

from pynamodb.attributes import UnicodeAttribute, BooleanAttribute, UTCDateTimeAttribute
from pynamodb.models import Model

device_table = os.environ['PARKING_DEVICE_TABLE']


class DeviceModel(Model):
    class Meta:
        table_name = device_table
        if 'ENV' in os.environ:
            host = 'http://localhost:8000'
        else:
            region = os.environ['REGION']

    park_id = UnicodeAttribute(hash_key=True, null=False)
    device_id = UnicodeAttribute(range_key=True, null=False)
    balena_UUID = UnicodeAttribute(null=False)
    case_UUID = UnicodeAttribute(null=False)
    created_at = UTCDateTimeAttribute(null=False, default=datetime.now())
    custom_latitude = UnicodeAttribute(null=False)
    custom_longitude = UnicodeAttribute(null=False)
    device_name = UnicodeAttribute(null=False)
    device_type = UnicodeAttribute(null=False)
    ip_address = UnicodeAttribute(null=False)
    is_active = BooleanAttribute(null=False, default=True)
    is_online = BooleanAttribute(null=False, default=True)
    latitude = UnicodeAttribute(null=True)
    longitude = UnicodeAttribute(null=True)
    mac_address = UnicodeAttribute(null=False)
    master_device = UnicodeAttribute(null=True)
    note = UnicodeAttribute(null=True)
    public_ip_address = UnicodeAttribute(null=True)
    updatedAt = UTCDateTimeAttribute(null=False, default=datetime.now())

    def save(self, conditional_operator=None, **expected_values):
        super(DeviceModel, self).save()

    def __iter__(self):
        for name, attr in self._get_attributes().items():
            yield name, attr.serialize(getattr(self, name))
