/** @typedef {import('../prisma/prisma.service').PrismaService} Prisma */
/** @typedef {import('../app.module').AppModule} Module */

import { initAuthController } from './auth.controller.js';
import {initAuthService} from './auth.service.js';

/**
 * Auth module
 * @param {Prisma} prisma
 * @returns {Module}
 */
export const initAuthModule = ({ prisma }) => {
  const authService = initAuthService({prisma})
  const authRoutes = initAuthController(authService);

  return {
    services: [],
    routes: [...authRoutes],
  };
};
