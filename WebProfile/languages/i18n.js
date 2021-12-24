const i18n = require('next-i18next').default;

module.exports = new i18n({
    defaultNS: 'common',
    serverLanguageDetection: false,
    browserLanguageDetection: false,
    defaultLanguage: 'en',
    fallbackLng: 'en',
    otherLanguages: ['vi'],
    localeSubpaths: {
        en: 'en',
        vi: 'vi',
    },
});
