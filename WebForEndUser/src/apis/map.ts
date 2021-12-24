import { commonFetch } from '@apis/index';
import { API_ENDPOINT } from '@config';

export const findUnits = async (lat: number, lng: number, radius: number = 1000): Promise<IApiFindUnits> =>
    commonFetch(`${API_ENDPOINT}/unit/find/${lat}/${lng}?radius=${radius}`, {
        method: "GET",
    });

export const getUnitInfo = async (hashKey: number, rangeKey: string): Promise<IParkingUnit> =>
    commonFetch(`${API_ENDPOINT}/unit/get/${hashKey}/${rangeKey}`, {
        method: "GET",
    });
