/**
 * @typedef {import('metasql').Database} Database
 * @typedef {import('./dto/sign-up.dto').SignUpDto} SignUpDto
 * @typedef {import('./user.repository').UserRepository} UserRepository
 * @typedef {object} Deps
 * @property {UserRepository} userRepository
 *
 * @callback SignUpUser
 * @param {SignUpDto} payload
 *
 * @typedef {object} AuthService
 * @property {SignUpUser} signUpUser
 */

import crypto from 'node:crypto';
import { partial } from '@oldbros/shiftjs';

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
 * @returns {AuthService}
 */
export const initAuthService = (deps) => ({
  signUpUser: partial(signUpUser, deps),
});

/**
 * @param {string} password
 * @returns {Promise<string>}
 */
function generateHashForPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('base64');
    crypto.scrypt(password, salt, 64, (err, result) => {
      if (err) reject(err);
      resolve(salt + ':' + result.toString('base64'));
    });
  });
}
