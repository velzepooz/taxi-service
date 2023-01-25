/**
 * @typedef {import('./dto/sign-up.dto').SignUpDto} SignUpDto
 * @typedef {object} Deps
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
  await generateHashForPassword(payload.password);
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
