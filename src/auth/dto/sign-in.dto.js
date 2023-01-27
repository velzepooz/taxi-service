import { userDto } from './user.dto.js';

/**
 * @typedef {object} SignInDto
 * @property {string} password
 * @property {string} phone
 */
export const signInDto = {
  required: [
    'phone',
    'password',
  ],
  ...userDto,
};
