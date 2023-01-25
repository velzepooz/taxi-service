/** @typedef {import('../app.module').AppModule} Module */

import { initAuthController } from './auth.controller.js';
import { initAuthService } from './auth.service.js';

/**
 * Auth module
 * @returns {Module}
 */
export const initAuthModule = () => {
  const authService = initAuthService({});
  const authRoutes = initAuthController(authService);

  return {
    services: [],
    routes: [...authRoutes],
  };
};
