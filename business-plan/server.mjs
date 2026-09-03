import express from 'express';
import next from 'next';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const portalDirectory = dirname(fileURLToPath(import.meta.url));
const siteDirectory = join(portalDirectory, '..');
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
const portal = next({ dev: false, dir: portalDirectory });
const handlePortalRequest = portal.getRequestHandler();

await portal.prepare();

const server = express();
server.disable('x-powered-by');
server.use((_request, response, nextMiddleware) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  nextMiddleware();
});

server.use((request, response, nextMiddleware) => {
  if (request.path === '/internal-app' || request.path.startsWith('/internal-app/')) {
    return handlePortalRequest(request, response);
  }
  nextMiddleware();
});

server.use('/assets', express.static(join(siteDirectory, 'assets'), { maxAge: '1d' }));
server.use('/i18n', express.static(join(siteDirectory, 'i18n'), { maxAge: '1h' }));
server.use('/business-plan/public', express.static(join(portalDirectory, 'public'), { maxAge: '1d' }));
server.use('/business-plan/content/assets', express.static(join(portalDirectory, 'content/assets'), { maxAge: '1d' }));
server.use('/terms', express.static(join(siteDirectory, 'terms'), { extensions: ['html'] }));
server.get('/styles.css', (_request, response) => response.sendFile(join(siteDirectory, 'styles.css')));
server.get('/app.js', (_request, response) => response.sendFile(join(siteDirectory, 'app.js')));
server.get(['/', '/index.html'], (_request, response) => response.sendFile(join(siteDirectory, 'index.html')));
server.use((_request, response) => response.status(404).sendFile(join(siteDirectory, 'index.html')));

server.listen(port, host, () => {
  console.log(`Tellie is listening on ${host}:${port}`);
});
