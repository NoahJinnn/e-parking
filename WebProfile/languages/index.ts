import next_i18next from './i18n';
import routes from './routes';

export default next_i18next;
export const i18n = next_i18next.i18n;
export const appWithTranslation = next_i18next.appWithTranslation;
export const withTranslation = next_i18next.withTranslation;
export const useTranslation = next_i18next.useTranslation;
export const Link = routes.Link;
