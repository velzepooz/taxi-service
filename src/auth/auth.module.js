/**
 * @typedef {import('../app.module').AppModule} Module
 */

import { initAuthController } from './auth.controller.js';
import { initAuthService } from './auth.service.js';
import { initUserRepository } from './user.repository.js';
import { initJwtService } from './jwt.service.js';

/**
 * Auth module
 * @param {import('../../types/src/auth/auth.module').Deps} deps
 * @returns {Module}
 */
export const initAuthModule = ({ queryBuilder }) => {
  const userRepository = initUserRepository({ queryBuilder });
  const jwtService = initJwtService();
  const authService = initAuthService({ userRepository, jwtService });
  const authRoutes = initAuthController(authService, jwtService);

  return {
    services: [],
    routes: [...authRoutes],
  };
};
