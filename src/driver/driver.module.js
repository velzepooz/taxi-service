/** @typedef {import('../app.module').AppModule} Module */

import { initDriverService } from './driver.service.js';
import { initDriverController } from './driver.controller.js';

/**
 * @return {Module}
 */
export const initDriverModule = () => {
  const driverService = initDriverService(null);
  const driverRoutes = initDriverController(driverService);

  return {
    services: [driverService],
    routes: [...driverRoutes],
  };
};
