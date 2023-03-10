import { initAuthController } from './auth/auth.controller.js';
import { initDriverController } from './driver/driver.controller.js';
import { initTripController } from './trip/trip.controller.js';

/**
 * @type {import('../types/src/common.types').initController}
 */
export const initControllers = (container) => {
  const authRoutes = initAuthController(container);
  const driverRoutes = initDriverController(container);
  const tripRoutes = initTripController(container);

  return [...authRoutes, ...driverRoutes, ...tripRoutes];
};
