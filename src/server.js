import { initFastifyApp } from './fastify-app.js';
import { config } from './config.js';

(async () => {
  const server = initFastifyApp();

  await server.listen(config.server);
})();
