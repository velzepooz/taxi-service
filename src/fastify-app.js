/** @typedef {import('fastify').FastifyServerOptions} FastifyServerOptions */

import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';

import { httpErrorHandler } from './utils/error-handlers.utils.js';
import { initControllers } from './init-controllers.js';
import container from './di-container.js';

/**
 * Build fastify app
 * @param {FastifyServerOptions} opts
 */
export const initFastifyApp = (opts = { logger: true }) => {
  const app = fastify(opts);

  app.register(fastifyCookie);
  app.setErrorHandler(httpErrorHandler);

  const routes = initControllers(container);

  for (const route of routes) {
    app.route(route);
  }

  return app;
};
