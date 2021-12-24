type TSupportDarkMode = "light" | "dark" | "auto";
type TSupportLanguage = "vi" | "en";
type TMainPages = "map" | "history" | "message" | "account" | "setting" | "test";

interface IAppConfig {
    /**
     * User token from from login
     */
    userToken?: string;
    /**
     * If app is in dark mode
     */
    dark?: TSupportDarkMode;
}

interface ISupportLang {
    en: {
        short: string;
        full: string;
    };
    vi: {
        short: string;
        full: string;
    };
}

interface IPrefix {
    name: string;
    dial_code: string;
    code: string;
    latitude?: number | string;
    longitude?: number | string;
}
