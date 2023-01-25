import { userDto } from './user.dto.js';

/**
 * @typedef {object} SignUpDto
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {string} phone
 * @property {string} driverLicenceId
 * @property {Date} dateOfBirth
 */
export const signUpDto = {
  required: ['firstName', 'lastName', 'email', 'phone', 'password', 'dateOfBirth'],
  ...userDto,
};
