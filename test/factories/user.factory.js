/** @typedef {import('../../src/auth/dto/user.dto').UserDto} UserDto */

import { config } from '../../src/config.js';
import { initDbQueryBuilder } from '../../src/db.js';
import { faker } from '../utils/faker.js';
import { generateHashForPassword } from '../../src/utils/crypto.utils.js';

const queryBuilder = initDbQueryBuilder({
  ...config.db,
  logger: {
    db: () => console,
    debug: () => console,
  },
});

/**
 * @typedef {object} CreateUserData
 * @property {?string} firstName
 * @property {?string} lastName
 * @property {?string} email
 * @property {?string} phone
 * @property {?string} password
 * @property {?Date} dateOfBirth
 */

/**
 * @param {CreateUserData} userData
 * @returns {UserDto}
 */
export const createUser = async ({
  firstName = faker.firstName(),
  lastName = faker.lastName(),
  email = faker.email(),
  phone = faker.mobilePhone(),
  password = faker.string(),
  dateOfBirth = new Date().toISOString(),
}) => {
  const passwordHash = await generateHashForPassword(password);
  const result = await queryBuilder.insert('User', {
    firstName,
    lastName,
    email,
    phone,
    password: passwordHash,
    dateOfBirth,
    updatedAt: new Date(),
  })
    .returning(['*']);

  return result.rows[0];
};
