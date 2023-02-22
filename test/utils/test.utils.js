/** @typedef {import('fastify').FastifyServerOptions} FastifyServerOptions */

import fastify from 'fastify';
import { initAppModule } from '../../src/app.module.js';
import { config } from '../../src/config.js';

/**
 * Build fastify app for integration testing
 * @param {FastifyServerOptions} opts
 */
export const buildApp = (opts = {}) => {
  const app = fastify(opts);

  const { routes } = initAppModule(config);

  for (const route of routes) {
    app.route(route);
  }

  return app;
};
