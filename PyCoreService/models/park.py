import os
import uuid
from datetime import datetime as dt

from pynamodb.attributes import (
    UnicodeAttribute,
    UTCDateTimeAttribute,
    NumberAttribute,
    BooleanAttribute,
    ListAttribute,
    MapAttribute
)
from pynamodb.models import Model

park_table = os.environ['PARKING_INFO_TABLE']
gsi = os.environ['PARKING_INFO_TABLE_INDEX']


class ParkModel(Model):
    class Meta:
        table_name = park_table
        if 'ENV' in os.environ:
            host = 'http://localhost:8000'
        else:
            region = os.environ['REGION']

    owner_id = UnicodeAttribute(hash_key=True, null=False)
    park_id = UnicodeAttribute(default=str(uuid.uuid1()))
    address = UnicodeAttribute(null=True)
    tel = UnicodeAttribute(null=False)
    available_cabin = NumberAttribute()
    balena_cloud_uuid = UnicodeAttribute(null=True)
    closed_time = UnicodeAttribute(null=True)
    country_code = UnicodeAttribute(null=True)
    cpu_temperature = NumberAttribute(null=True)
    creation_date = UTCDateTimeAttribute(default=dt.now())
    dpu_temperature = NumberAttribute(null=True)
    fee_for_all_day = NumberAttribute()
    fee_per_hour_for_day = ListAttribute()
    geohash = UnicodeAttribute(null=True)
    geoJson = UnicodeAttribute(null=True)
    name = UnicodeAttribute(null=True)
    open_time = UnicodeAttribute(null=True)
    public_url = UnicodeAttribute(null=True)
    service_available = UnicodeAttribute(null=True)
    total_cabin = NumberAttribute(null=True)
    image = UnicodeAttribute()
    kyc = BooleanAttribute()

    def save(self, conditional_operator=None, **expected_values):
        super(ParkModel, self).save()

    def __iter__(self):
        for name, attr in self.get_attributes().items():
            if isinstance(attr, MapAttribute):
                if getattr(self, name):
                    yield name, getattr(self, name).as_dict()
            elif isinstance(attr, UTCDateTimeAttribute):
                if getattr(self, name):
                    yield name, attr.serialize(getattr(self, name))
            elif isinstance(attr, NumberAttribute):
                yield name, getattr(self, name)
            if isinstance(attr, ListAttribute):
                yield name, [el for el in getattr(self, name)]
            else:
                yield name, attr.serialize(getattr(self, name))
