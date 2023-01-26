/**
 * @typedef {import('metasql').Database} Database
 * @typedef {import('./dto/sign-up.dto').SignUpDto} SignUpDto
 * @typedef {object} Deps
 * @property {Database} queryBuilder
 *
 * @typedef {SignUpDto} UserToCreate
 *
 * @callback CreateUser
 * @param {UserToCreate} userToCreate
 *
 * @typedef {object} UserRepository
 * @property {CreateUser} createUser
 */

import { partial } from '@oldbros/shiftjs';

/**
 * @param {Deps} deps
 * @param {UserToCreate} userToCreate
 * @returns {Promise<void>}
 */
export const createUser = async ({ queryBuilder }, userToCreate) => {
  await queryBuilder.insert('User', { ...userToCreate, updatedAt: new Date() });
};

/**
 * @param {Deps} deps
 * @returns {UserRepository}
 */
export const initUserRepository = (deps) => ({
  createUser: partial(createUser, deps),
});
