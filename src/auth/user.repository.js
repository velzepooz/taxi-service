/**
 * @typedef {import('../../types/src/auth/dto/user.dto').UserDto} UserDto
 * @typedef {import('../../types/src/auth/user.repository').Deps} Deps
 * @typedef {import('../../types/src/auth/user.repository').UserToCreate} UserToCreate
 * @typedef {import('../../types/src/auth/user.repository').UserToUpdate} UserToUpdate
 * @typedef {import('../../types/src/auth/user.repository').FindOneCondition} FindOneCondition
 * @typedef {import('../../types/src/auth/user.repository').User} User
 * @typedef {import('../../types/src/auth/user.repository').UserRepository} UserRepository
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
  /** @type {*} User[] */
  const result = await queryBuilder
    .select('User', ...Object.entries(conditions).map(([field, value]) => ({ [field]: value })));

  return result[0] || null;
};

/**
 * @param {Deps} deps
 * @param {FindOneCondition} conditions
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
