import { secureFetch } from '@apis/index';
import { API_ENDPOINT } from '@config';

export const generateOtpAPI = async (phone: string, countryCode: string) =>
    secureFetch(`${API_ENDPOINT}/otp-generation`, {
        method: "POST",
        body: { phone, countryCode },
    });
