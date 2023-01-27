/**
 * @typedef {import('./dto/sign-up.dto').SignUpDto} SignUpDto
 * @typedef {import('./dto/sign-in.dto').SignInDto} SignInDto
 * @typedef {import('fastify').RouteOptions} FastifyRoute
 * @typedef {import('./auth.service').AuthService} AuthService
 */

import { signUpDto } from './dto/sign-up.dto.js';
import { signInDto } from './dto/sign-in.dto.js';

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

  const signInRoute = {
    method: 'POST',
    schema: {
      body: signInDto,
    },
    url: `${urlPrefix}/signIn`,
    handler: async (request, reply) => {
      /** @type {SignInDto}  */
      const payload = request.body;

      const result = await authService.signInUser(payload);

      reply.header('set-cookie', result.accessCookie);
      reply.header('set-cookie', result.refreshCookie);

      reply.code(200).send(result.user);
    },
  };

  return [signUpRoute, signInRoute];
};
