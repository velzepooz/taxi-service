/**
 * @typedef {import('fastify').RouteOptions} FastifyRoute
 * @typedef {import('./config').Config} Config
 */
/**
 * @typedef {object} AppModule
 * @property {array} services
 * @property {FastifyRoute[]} routes
 */

import { initDriverModule } from './driver/driver.module.js';
import { initAuthModule } from './auth/auth.module.js';
import { initDbQueryBuilder } from './db.js';

/**
 * @param {Config} config
 * @returns {AppModule}
 */
export const initAppModule = (config) => {
  const queryBuilder = initDbQueryBuilder({
    ...config.db,
    logger: {
      db: () => console,
      debug: () => console,
    },
  });
  const { routes: authRoute } = initAuthModule({ queryBuilder });
  const { routes: driverRoutes } = initDriverModule();

  return {
    services: [],
    routes: [...authRoute, ...driverRoutes],
  };
};
