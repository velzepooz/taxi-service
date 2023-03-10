/**
 * @typedef {import('fastify').RouteOptions} FastifyRoute
 */

import { initAuthController } from './auth/auth.controller.js';
import { initDriverController } from './driver/driver.controller.js';

/**
 * @param {import('../types/src/di-container').DiContainer} container
 * @returns {FastifyRoute[]}
 */
export const initControllers = (container) => {
  const authRoutes = initAuthController(container);
  const driverRoutes = initDriverController(container);

  return [...authRoutes, ...driverRoutes];
};
