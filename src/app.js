import fastify from 'fastify';
import { initAppModule } from './app.module.js';
import { config } from './config.js';

const server = fastify({ logger: true });

const { routes } = initAppModule();

for (const route of routes) {
  server.route(route);
}

await server.listen(config.server);
