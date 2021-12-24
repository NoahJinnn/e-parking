const nextI18nRoutes = require('next-i18n-routes');

const routes = nextI18nRoutes({
    locales: ['en', 'vi'],
    defaultLocale: 'en',
});

module.exports = routes;
