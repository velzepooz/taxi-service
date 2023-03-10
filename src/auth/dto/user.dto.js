export const userDto = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    createdAt: {
      type: 'string',
      format: 'date',
    },
    updatedAt: {
      type: 'string',
      format: 'date',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    phone: {
      type: 'string',
      minLength: 10,
      maxLength: 20,
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    dateOfBirth: {
      type: 'string',
      format: 'date-time',
    },
    refreshToken: {
      type: 'string',
    },
  },
};
