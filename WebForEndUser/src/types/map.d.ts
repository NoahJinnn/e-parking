interface IGeoLocation {
    latitude: number;
    longitude: number;
}
interface IGeoLocationShort {
    lat: number;
    lng: number;
}

interface IReview {
    userId: string | number;
    star: number;
    comment: string;
    time: Date;
}

interface IUnitAbout {
    timeOpen: Date;
    timeClose: Date;
    parkType: string;
    parkPaymentInfo?: string[];
    images: string[];
}

interface IUnitLocation {
    rangeKey: string;
    hashKey: number;
    name: string;
}

interface IMarker extends IGeoLocation, IUnitLocation {
    address: string;
    total_cabin: number;
    available_cabin: number;
    type: string;
}

interface IParkingUnit extends IUnitLocation {
    closed_time: string;
    geohash: number;
    geoJson: string;
    database_index: number;
    address: string;
    fee_for_all_day: number;
    creation_date: number;
    total_cabin: number;
    cpu_temperature: number;
    service_available: boolean;
    open_time: string;
    rangeKey: string;
    available_cabin: number;
    dpu_temperature: number;
    public_url: string;
    fee_per_hour_for_day: IFeePerHourForDay[];
    balena_cloud_uuid: string;
    country_code: string;
    type: string;
}

interface IFeePerHourForDay {
    name: string;
    timeEnd: string;
    timeStart: string;
    fee: number;
}
