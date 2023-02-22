import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { initAppModule } from './app.module.js';
import { config } from './config.js';

const server = fastify({ logger: true });

server.register(fastifyCookie);

const { routes } = initAppModule(config);

for (const route of routes) {
  server.route(route);
}

await server.listen(config.server);
