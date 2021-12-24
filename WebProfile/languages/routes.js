const nextI18nRoutes = require('next-i18n-routes');

const routes = nextI18nRoutes({
    locales: ['en', 'vi'],
    defaultLocale: 'en',
});

routes.add('product/slug', '/product/:slug');
routes.add('page/slug', '/page/:slug');

module.exports = routes;
