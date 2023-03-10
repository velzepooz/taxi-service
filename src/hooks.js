/**
 * @typedef {import('../types/src/auth/jwt.service').JwtService} JwtService
 * @typedef {import('../types/src/common.types').RequestWithUserId} RequestWithUserId
 */
import { jwtConfig } from './auth/config.js';
import { ApplicationError } from './utils/application.error.js';
import container from './di-container.js';

/**
 * @param {RequestWithUserId} request
 */
export const refreshTokenHook = async (request) => {
  const { jwtService } = container;
  const { Refresh = '' } = request.cookies;

  const data = await jwtService.verifyJwt(Refresh, jwtConfig.refreshTokenSecret);

  if (!data) {
    throw new ApplicationError('Unauthorized');
  }

  request.userId = data.id;
};

/**
 * @param {RequestWithUserId} request
 */
export const accessTokenHook = async (request) => {
  const { jwtService } = container;
  const { Authentication } = request.cookies;

  if (Authentication) {
    const [_tokenType, token] = Authentication.split(' ');
    const data = await jwtService.verifyJwt(token, jwtConfig.accessTokenSecret);

    if (data) {
      request.userId = data.id;
      return;
    }
  }

  throw new ApplicationError('Unauthorized');
};
