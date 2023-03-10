/**
 * @typedef {import('fastify').RouteOptions} FastifyRoute
 * @typedef {import('fastify').FastifyReply} FastifyReply
 * @typedef {import('../../types/src/auth/dto/sign-up.dto').SignUpDto} SignUpDto
 * @typedef {import('../../types/src/auth/dto/sign-in.dto').SignInDto} SignInDto
 * @typedef {import('../../types/src/auth/auth.service').AuthService} AuthService
 * @typedef {import('../../types/src/common.types').RequestWithUserId} RequestWithUserId
 * @typedef {import('../../types/src/di-container').DiContainer} DiContainer
 */

import { accessTokenHook, refreshTokenHook } from '../hooks.js';
import { signUpDto } from './dto/sign-up.dto.js';
import { signInDto } from './dto/sign-in.dto.js';

/**
 * @param {DiContainer} container
 * @returns {FastifyRoute[]}
 */
export const initAuthController = (container) => {
  const { authService } = container;
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

  const refreshRoute = {
    method: 'POST',
    url: `${urlPrefix}/refresh`,
    onRequest: refreshTokenHook,
    /**
     * @param {RequestWithUserId} request
     * @param {FastifyReply} reply
     * @return {Promise<void>}
     */
    handler: async (request, reply) => {
      const result = await authService.refreshAccessToken(request.userId);

      reply.header('set-cookie', result);
      reply.code(200);
    },
  };

  const signOutRoute = {
    method: 'POST',
    url: `${urlPrefix}/signOut`,
    onRequest: accessTokenHook,
    /**
     * @param {RequestWithUserId} request
     * @param {FastifyReply} reply
     * @return {Promise<void>}
     */
    handler: async (request, reply) => {
      await authService.signOut(request.userId);

      reply.header('set-cookie', 'Authentication=');
      reply.header('set-cookie', 'Refresh=');
      reply.code(200);
    },
  };

  return [signUpRoute, signInRoute, refreshRoute, signOutRoute];
};
