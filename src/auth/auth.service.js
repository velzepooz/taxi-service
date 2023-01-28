/**
 * @typedef {import('metasql').Database} Database
 * @typedef {import('./dto/sign-up.dto').SignUpDto} SignUpDto
 * @typedef {import('./dto/sign-in.dto').SignInDto} SignInDto
 * @typedef {import('./dto/user.dto').UserDto} UserDto
 * @typedef {import('../config').Config} Config
 * @typedef {import('./user.repository').UserRepository} UserRepository
 * @typedef {import('./jwt.service').JwtService} JwtService
 * @typedef {object} Deps
 * @property {UserRepository} userRepository
 * @property {JwtService} jwtService
 * @property {Config} config
 *
 * @typedef {object} SignInResult
 * @property {UserDto | null} user
 * @property {string} accessCookie
 * @property {string} refreshCookie
 *
 * @callback SignUpUser
 * @param {SignUpDto} payload
 *
 * @callback SignInUser
 * @param {SignInDto} payload
 * @returns {Promise<SignInResult>}
 *
 * @typedef {object} AuthService
 * @property {SignUpUser} signUpUser
 * @property {SignInUser} signInUser
 */

import { partial } from '@oldbros/shiftjs';
import { comparePasswords, generateHashForPassword } from '../utils/crypto.utils.js';

/**
 * @param {Deps} deps
 * @param {SignUpDto} payload
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
  const { userRepository, jwtService, config } = deps;

  const user = await userRepository.findOne({ phone: payload.phone });

  if (!user) return { user:  null, accessCookie: '', refreshCookie: '' };

  const isCorrectPassword = await comparePasswords(payload.password, user.password);

  if (!isCorrectPassword) return { user: null, accessCookie: '', refreshCookie: '' };

  const accessToken = await jwtService.generateJwtToken({
    data: { id: user.id },
    secret: config.jwt.accessTokenSecret,
    expireTime: config.jwt.accessTokenExpireTime,
  });
  const refreshToken = await jwtService.generateJwtToken({
    data: { id: user.id },
    secret: config.jwt.refreshTokenSecret,
    expireTime: config.jwt.refreshTokenExpireTime,
  });

  await userRepository.updateOne({ id: user.id }, { refreshToken });

  return {
    user: {
      ...user,
      password: null,
    },
    accessCookie:
      `Authentication=Bearer ${accessToken}; Secure; HttpOnly; Path=/; Max-Age=${config.jwt.accessTokenExpireTime}`,
    refreshCookie:
      `Refresh=${refreshToken}; Secure; HttpOnly; Path=/; Max-Age=${config.jwt.refreshTokenExpireTime}`,
  };
};

/**
 * @param {Deps} deps
 * @returns {AuthService}
 */
export const initAuthService = (deps) => ({
  signUpUser: partial(signUpUser, deps),
  signInUser: partial(signInUser, deps),
});
