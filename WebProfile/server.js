const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

// Language configs
const nextI18next = require('./languages/i18n');
const routes = require('./languages/routes');

const port = process.env.NODE_ENV == 'production' ? 3000 : 3002;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

class Server {
    /**
     * run SSR
     */
    static async run() {
        // Load resources
        await app.prepare();
        await nextI18next.initPromise;

        // Config server
        const server = express();
        server.use(nextI18NextMiddleware(nextI18next));
        server.use(handler);
        server.get('*', (req, res) => handler(req, res));
        await server.listen(port);

        // Run app
        console.log(`> Ready on http://localhost:${port}`);
    }
}
Server.run();
