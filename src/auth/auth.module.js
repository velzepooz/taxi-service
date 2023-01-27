/**
 * @typedef {import('metasql').Database} Database
 * @typedef {import('../app.module').AppModule} Module
 * @typedef {import('../config').Config} Config
 */

import { initAuthController } from './auth.controller.js';
import { initAuthService } from './auth.service.js';
import { initUserRepository } from './user.repository.js';
import { initJwtService } from './jwt.service.js';

/**
 * @typedef {object} Deps
 * @property {Database} queryBuilder
 * @property {Config} config
 */

/**
 * Auth module
 * @param {Deps} deps
 * @returns {Module}
 */
export const initAuthModule = ({ queryBuilder, config }) => {
  const userRepository = initUserRepository({ queryBuilder });
  const jwtService = initJwtService();
  const authService = initAuthService({ userRepository, jwtService, config });
  const authRoutes = initAuthController(authService);

  return {
    services: [],
    routes: [...authRoutes],
  };
};
