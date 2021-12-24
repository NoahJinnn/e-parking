import { LOCALE } from './type';

// Action set active locale
export const setLocale = (data: string = 'en') => {
    return {
        type: LOCALE,
        data,
    };
};
