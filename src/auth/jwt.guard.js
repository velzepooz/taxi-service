/**
 * @typedef {import('../../types/src/auth/jwt.service').JwtService} JwtService
 * @typedef {import('../../types/src/common.types').RequestWithUserId} RequestWithUserId
 * @typedef {import('../../types/src/auth/auth.service').JwtTokenPayload} JwtTokenPayload
 */


import { jwtConfig } from './config.js';
import { UnauthorizedException } from './auth.exceptions.js';

/**
 * @callback OnRequestHookHandler
 * @param {RequestWithUserId} request
 */
/**
 * @param {JwtService} jwtService
 * @return {OnRequestHookHandler}
 */
export const initJwtGuard = (jwtService) => async (request) => {
  const { Authentication } = request.cookies;

  if (Authentication) {
    /** @type {*} JwtTokenPayload */
    const data = await jwtService.verifyJwt(Authentication.split(' ')[1], jwtConfig.accessTokenSecret);

    if (data) {
      /** @type {RequestWithUserId} */
      request.userId = data.id;
    }
  }

  throw new UnauthorizedException('Unauthorized');
};
