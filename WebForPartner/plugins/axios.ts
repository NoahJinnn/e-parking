import axios from 'axios';
import { AuthService } from '@services/index';

const baseURL = `${process.env.URL}${process.env.API_PORT ? ':' + process.env.API_PORT : ''}/api/`;

/**
 * Create Axios
 */
const http = axios.create({
    baseURL,
});

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our API back-end. This library automatically handles sending the
 * Beaer token as a Authorization header based on the value of the "XSRF" token cookie.
 */
http.interceptors.request.use(
    (config) => {
        config.headers.common['Authorization'] = AuthService.accessToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

/**
 * Handle all error messages.
 */
http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status >= 301 && response.status <= 451) {
            if (response.status == 401) {
            }
            if (response.status == 413) {
            }
            return Promise.reject(response);
        }

        return Promise.reject(response);
    },
);

export default http;
