import { buildApp } from './app.js';
import { config } from './config.js';

(async () => {
  const server = buildApp();

  await server.listen(config.server);
})();
