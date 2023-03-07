/** @typedef {import('fastify').FastifyServerOptions} FastifyServerOptions */

import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { initControllers } from './init-controllers.js';
import container from './di-container.js';

/**
 * Build fastify app
 * @param {FastifyServerOptions} opts
 */
export const initFastifyApp = (opts = { logger: true }) => {
  const app = fastify(opts);

  app.register(fastifyCookie);

  const routes = initControllers(container);

  for (const route of routes) {
    app.route(route);
  }

  return app;
};
