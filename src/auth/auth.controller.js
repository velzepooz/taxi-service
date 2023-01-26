/**
 * @typedef {import('./dto/sign-up.dto').SignUpDto} SignUpDto
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

  const signUpRoute = {
    method: 'POST',
    schema: {
      body: signUpDto,
    },
    url: `${urlPrefix}/signUp`,
    handler: async (request, reply) => {
      /** @type {SignUpDto}  */
      const payload = request.body;

      await authService.signUpUser(payload);

      reply.code(201);
    },
  };

  return [signUpRoute];
};
