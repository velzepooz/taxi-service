/**
 * @typedef {import('fastify').RouteOptions} FastifyRoute
 */

import { initAuthController } from './auth/auth.controller.js';
import container from './di-container.js';
import { initDriverController } from './driver/driver.controller.js';

/**
 * @returns {FastifyRoute[]}
 */
export const initControllers = () => {
  const authRoutes = initAuthController(container);
  const driverRoutes = initDriverController();

  return [...authRoutes, ...driverRoutes];
};
