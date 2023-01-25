/** @typedef {import('fastify').RouteOptions} FastifyRoute */
/**
 * @typedef {object} AppModule
 * @property {array} services
 * @property {FastifyRoute[]} routes
 */

import { initDriverModule } from './driver/driver.module.js';
import { initAuthModule } from './auth/auth.module.js';
import {initPrismaService} from './prisma/prisma.service.js';

/**
 * @returns {AppModule}
 */
export const initAppModule = () => {
  const prisma = initPrismaService();
  const { routes: authRoute } = initAuthModule({ prisma });
  const { routes: driverRoutes } = initDriverModule();

  return {
    services: [],
    routes: [...authRoute, ...driverRoutes],
  };
};
