import { userDto } from './user.dto.js';

export const signInDto = {
  required: [
    'phone',
    'password',
  ],
  ...userDto,
};
