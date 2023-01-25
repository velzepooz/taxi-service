/**
 * @typedef {import('fastify').RouteOptions} FastifyRoute
 * @typedef {import('./auth.service').AuthService} AuthService
 */

import { signUpDto } from './dto/sign-up.dto.js';

/**
 * @param {AuthService} authService
 * @returns {FastifyRoute[]}
 */
export const initAuthController = (authService) => {
  const urlPrefix = '/auth';

  const signUpDriverRoute = {
    method: 'POST',
    schema: {
      body: signUpDto,
    },
    url: `${urlPrefix}/signUp`,
    handler: async (req) => {
      /** @type {SignUpDto}  */
      const payload = req.body;

      await authService.signUpDriver(payload);
    },
  };

  return [signUpDriverRoute];
};