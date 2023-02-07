/** @typedef {import('../types/src/auth/jwt.service').JwtService} JwtService */
import { jwtConfig } from './auth/config.js';
import { ApplicationError } from './application.error.js';

/**
 * @param {JwtService} jwtService
 */
export const refreshTokenHook = (jwtService) => async (request) => {
  const { Refresh } = request.cookies;

  const data = await jwtService.verifyJwt(Refresh, jwtConfig.refreshTokenSecret);

  if (!data) {
    throw new ApplicationError('Unauthorized');
  }

  request.userId = data.id;
};

/**
 *
 * @param {JwtService} jwtService
 */
export const accessTokenHook = (jwtService) => async (request) => {
  const { Authentication } = request.cookies;

  if (Authentication) {
    const [_tokenType, token] = Authentication.split(' ');
    const data = await jwtService.verifyJwt(token, jwtConfig.accessTokenSecret);

    if (data) {
      request.userId = data.id;
    }
  }

  throw new ApplicationError('Unauthorized');
};
