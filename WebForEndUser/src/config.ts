/**
 * APP VARIABLES
 */
export const APP_VERSION = "v1.0.0";
export const APP_NAME = "Example";
export const APP_AUTHOR = "Example";
export const POLICY_URL = "https://parkingandmore.com/en/page/privacy-policy";
export const MAP_KEY = "AIzaSyBewMr0-if3uDAgNTgtpLcJPqgfLFrfAII";
/**
 * Debug in app
 */
export const APP_DEBUG = true;

/**
 * Config for crashlytic
 */
export const APP_CRASHLYTICS = {
    enabled: true,
};
/**
 * Config for analytics
 */
export const APP_ANALYTICS: IAppAnalytics = {
    enabled: true,
    keyword: {
        class: [],
        funct: [],
        mess: [],
        dataKeys: [],
    },
};

/**
 * STORAGES VARIABLES
 */
export const APP_CONF_STORAGE_KEY = "aklsjd)_123klja";

/**
 * API Configurator
 */
export const API_ENDPOINT = "https://t7aiuzeox8.execute-api.ap-southeast-1.amazonaws.com/dev";
export const API_SECURE_KEY = "qwertyuioplkjhgfdsaz";
export const API_TIMEOUT = 10000;

/**
 * Fake datas
 */

export const fakeMakers: IMarker[] = [
    {
        rangeKey: "aa545095-5925-4f9a-b621-cbfd6504425f",
        hashKey: 35637,
        longitude: 106.68950066905627,
        latitude: 10.878092073236285,
        name: "Bãi xe Eustacia Thành phố Hồ Chí Minh",
        address: "4/30 Tổ 10 - KP1, Thạnh Lộc, Quận 12, Thành phố Hồ Chí Minh, Vietnam",
        total_cabin: 96,
        available_cabin: 93,
        type: "Charge Unit",
    },
    {
        rangeKey: "76fd8494-e583-4866-bddf-26d8937adfb2",
        hashKey: 35637,
        longitude: 106.69078484891607,
        latitude: 10.877515897186363,
        name: "Bãi xe Katee Thành phố Hồ Chí Minh",
        address: "24 Chiến Khu, Thạnh Lộc, Quận 12, Thành phố Hồ Chí Minh, Vietnam",
        total_cabin: 17,
        available_cabin: 12,
        type: "Charge Unit",
    },
    {
        rangeKey: "f5a573c5-766a-430f-a336-1de48165c93f",
        hashKey: 35637,
        longitude: 106.69086114894782,
        latitude: 10.877480920633104,
        name: "Bãi xe Cheri Thành phố Hồ Chí Minh",
        address: "24 Chiến Khu, Thạnh Lộc, Quận 12, Thành phố Hồ Chí Minh, Vietnam",
        total_cabin: 49,
        available_cabin: 44,
        type: "Charge Unit",
    },
    {
        rangeKey: "c2cbe152-a506-4136-a636-6b1273f45d2f",
        hashKey: 35637,
        longitude: 106.69101655820259,
        latitude: 10.877409419899834,
        name: "Bãi xe Eda Thành phố Hồ Chí Minh",
        address: "80 Tổ 21 KP3, Thạnh Lộc, Quận 12, Thành phố Hồ Chí Minh, Vietnam",
        total_cabin: 59,
        available_cabin: 7,
        type: "Charge Unit",
    },
];

export const fakeUnit: IParkingUnit = {
    closed_time: "01:00",
    hashKey: 35638,
    geoJson: '{"type":"POINT","coordinates":[106.6077218770922,10.87466976239288]}',
    database_index: 0,
    address: "15/4 ấp Mới 2, Chung Chánh, Hóc Môn, Thành phố Hồ Chí Minh, Vietnam",
    name: "Bãi xe Becca Thành phố Hồ Chí Minh",
    fee_for_all_day: 111000,
    creation_date: 1610816400000,
    total_cabin: 22,
    cpu_temperature: 29,
    service_available: false,
    open_time: "07:00",
    rangeKey: "0043c87d-6418-4d14-9b26-14bc97dd14f3",
    available_cabin: 17,
    dpu_temperature: 25,
    public_url: "https://parkingandmore.com/en",
    fee_per_hour_for_day: [
        {
            name: "Sáng",
            timeEnd: "11:59",
            timeStart: "07:00",
            fee: 57000,
        },
        {
            name: "Trưa",
            timeEnd: "17:59",
            timeStart: "12:00",
            fee: 83000,
        },
        {
            name: "Chiều",
            timeEnd: "06:59",
            timeStart: "18:00",
            fee: 99000,
        },
    ],
    geohash: 3563800913622582000,
    balena_cloud_uuid: "0000000",
    country_code: "VN",
    type: "Charge Unit",
};
