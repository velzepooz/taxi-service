/** @typedef {import('../app.module').AppModule} Module */

import { initPrismaService } from '../prisma/prisma.service.js';
import { initDriverService } from './driver.service.js';
import { initDriverController } from './driver.controller.js';

/**
 * @return {Module}
 */
export const initDriverModule = () => {
  const prisma = initPrismaService();
  const driverService = initDriverService({ prisma });
  const driverRoutes = initDriverController(driverService);

  return {
    services: [prisma, driverService],
    routes: [...driverRoutes],
  };
};
