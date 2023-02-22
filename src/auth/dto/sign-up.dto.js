import { userDto } from './user.dto.js';

export const signUpDto = {
  required: ['firstName', 'lastName', 'email', 'phone', 'password', 'dateOfBirth'],
  ...userDto,
  additionalProperties: false,
};
