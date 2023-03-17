/**
 * @typedef {import('../../types/src/auth/auth.service').Deps} Deps
 * @typedef {import('../../types/src/auth/auth.service').AuthService} AuthService
 * @typedef {import('../../types/src/auth/auth.service').SignInResult} SignInResult
 * @typedef {import('../../types/src/auth/dto/sign-up.dto').SignUpDto} SignUpDto
 * @typedef {import('../../types/src/auth/dto/sign-in.dto').SignInDto} SignInDto
 * @typedef {import('../../types/src/auth/dto/user.dto').UserDto} UserDto
 * @typedef {import('../../types/src/auth/user.repository').UserRepository} UserRepository
 * @typedef {import('../../types/src/auth/user.repository').User} User
 * @typedef {import('../../types/src/auth/jwt.service').JwtService} JwtService
 */

import { partial } from '@oldbros/shiftjs';
import { comparePasswords, generateHashForPassword } from '../utils/crypto.utils.js';
import { ApplicationError } from '../utils/application.error.js';
import { jwtConfig } from './config.js';

/**
 * @param {Deps} deps
 * @param {SignUpDto} payload
 * @returns {Promise<void>}
 */
export const signUpUser = async (deps, payload) => {
  const { userRepository } = deps;
  const passwordHash = await generateHashForPassword(payload.password);

  await userRepository.createUser({
    ...payload,
    password: passwordHash,
  });
};

/**
 * @param {Deps} deps
 * @param {SignInDto} payload
 * @return {Promise<SignInResult>}
 */
export const signInUser = async (deps, payload) => {
  const { userRepository, jwtService } = deps;

  const user = await userRepository.findOne({ phone: payload.phone });

  if (!user) throw new ApplicationError('User not found');

  const isCorrectPassword = await comparePasswords(payload.password, user.password);

  if (!isCorrectPassword) throw new ApplicationError('Invalid password');

  const accessToken = await jwtService.generateJwtToken({
    payload: { id: user.id },
    secret: jwtConfig.accessTokenSecret,
    expireTime: jwtConfig.accessTokenExpireTime,
  });
  const refreshToken = await jwtService.generateJwtToken({
    payload: { id: user.id },
    secret: jwtConfig.refreshTokenSecret,
    expireTime: jwtConfig.refreshTokenExpireTime,
  });

  await userRepository.updateOne({ id: user.id }, { refreshToken });

  return {
    user: {
      ...user,
      password: null,
    },
    accessCookie: getAccessTokenCookie(accessToken, jwtConfig.accessTokenExpireTime),
    refreshCookie: getRefreshTokenCookie(refreshToken, jwtConfig.refreshTokenExpireTime),
  };
};

/**
 * @param {Deps} deps
 * @param {number} userId
 * @returns {Promise<string>}
 */
export const refreshAccessToken = async ({ jwtService }, userId) => {
  const accessToken = await jwtService.generateJwtToken({
    payload: { id: userId },
    secret: jwtConfig.accessTokenSecret,
    expireTime: jwtConfig.accessTokenExpireTime,
  });

  return getAccessTokenCookie(accessToken, jwtConfig.accessTokenExpireTime);
};

/**
 *
 * @param {Deps} deps
 * @param {number} userId
 * @return {Promise<void>}
 */
export const signOut = async ({ userRepository }, userId) => {
  await userRepository.updateOne({ id: userId }, { refreshToken: null });
};

/**
 * @param {string} accessToken
 * @param {string} accessTokenExpireTime
 * @returns {string}
 */
function getAccessTokenCookie(accessToken, accessTokenExpireTime) {
  return `Authentication=Bearer ${accessToken}; Secure; HttpOnly; Path=/; Max-Age=${accessTokenExpireTime};`;
}

/**
 * @param {string} refreshToken
 * @param {string} refreshTokenExpireTime
 * @returns {string}
 */
function getRefreshTokenCookie(refreshToken, refreshTokenExpireTime) {
  return `Refresh=${refreshToken}; Secure; HttpOnly; Path=/; Max-Age=${refreshTokenExpireTime};`;
}

/**
 * @param {Deps} deps
 * @returns {AuthService}
 */
export const initAuthService = (deps) => ({
  signUpUser: partial(signUpUser, deps),
  signInUser: partial(signInUser, deps),
  refreshAccessToken: partial(refreshAccessToken, deps),
  signOut: partial(signOut, deps),
});
