/**
 * @typedef {import('metasql').Database} Database
 * @typedef {import('../app.module').AppModule} Module
 */

import { initAuthController } from './auth.controller.js';
import { initAuthService } from './auth.service.js';
import { initUserRepository } from './user.repository.js';

/**
 * @typedef {object} Deps
 * @property {Database} queryBuilder
 */

/**
 * Auth module
 * @param {Deps} deps
 * @returns {Module}
 */
export const initAuthModule = ({ queryBuilder }) => {
  const userRepository = initUserRepository({ queryBuilder });
  const authService = initAuthService({ userRepository });
  const authRoutes = initAuthController(authService);

  return {
    services: [],
    routes: [...authRoutes],
  };
};
