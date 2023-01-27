/**
 * @typedef {import('metasql').Database} Database
 * @typedef {import('./dto/sign-up.dto').SignUpDto} SignUpDto
 * @typedef {import('./dto/user.dto').UserDto} UserDto
 * @typedef {object} Deps
 * @property {Database} queryBuilder
 *
 * @typedef {SignUpDto} UserToCreate
 *
 * @typedef {object} UserToUpdate
 * @property {?string} [id]
 * @property {?string} [createdAt]
 * @property {?string} [updatedAt]
 * @property {?string} [firstName]
 * @property {?string} [lastName]
 * @property {?string} [email]
 * @property {?string} [password]
 * @property {?string} [phone]
 * @property {?Date} [dateOfBirth]
 * @property {?string} [refreshToken]
 *
 * @typedef {object} FindOneCondition
 * @property {?string} [id]
 * @property {?string} [email]
 * @property {?string} [password]
 * @property {?string} [phone]
 *
 * @callback CreateUser
 * @param {UserToCreate} userToCreate
 *
 * @callback FindOne
 * @param {FindOneCondition} conditions
 *
 * @callback UpdateOne
 * @param {FindOneCondition} conditions
 * @param {UserToUpdate} updateData
 *
 * @typedef {object} UserRepository
 * @property {CreateUser} createUser
 * @property {FindOne} findOne
 * @property {UpdateOne} updateOne
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
 *
 * @param {Deps} deps
 * @param {FindOneCondition} conditions
 *
 * @returns {Promise<UserDto|null>}
 */
export const findOne = async ({ queryBuilder }, conditions) => {
  /** @type {*[]} UserDto */
  const result = await queryBuilder
    .select('User', ...Object.entries(conditions).map(([field, value]) => ({ [field]: value })));

  return result[0] || null;
};

/**
 *
 * @param {Deps} deps
 * @param {FindOne} conditions
 * @param {UserToUpdate} updateData
 * @returns {Promise<void>}
 */
export const updateOne = async ({ queryBuilder }, conditions, updateData) => {
  await queryBuilder
    .update('User', updateData, ...Object.entries(conditions).map(([field, value]) => ({ [field]: value })));
};

/**
 * @param {Deps} deps
 * @returns {UserRepository}
 */
export const initUserRepository = (deps) => ({
  createUser: partial(createUser, deps),
  findOne: partial(findOne, deps),
  updateOne: partial(updateOne, deps),
});
