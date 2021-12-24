import { APP_CONF_STORAGE_KEY } from '@config';

/**
 * Get current app config from localStorage
 */
export function getAppConfigs (): IAppConfig {
    try {
        return JSON.parse(localStorage.getItem(APP_CONF_STORAGE_KEY) || "{}");
    } catch (e) {
        console.warn("Getting config err, bring back to default state", e);
        saveAppConfigs({});
        return {};
    }
}

/**
 * Save config to localStorage and encode it
 * @param conf Current config of app
 */
export function saveAppConfigs (conf: IAppConfig) {
    try {
        localStorage.setItem(APP_CONF_STORAGE_KEY, JSON.stringify(conf));
        return true;
    } catch (e) {
        console.warn("Saving app conf err", e);
        return false;
    }
}
