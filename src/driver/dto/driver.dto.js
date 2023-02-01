/**
 * @typedef {object} DriverDto
 * @property {?string} id
 * @property {?string} createdAt
 * @property {?string} updatedAt
 * @property {string} driverLicenceId
 * @property {number} userId
 */
export const driverDto = {
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
    driverLicenceId: {
      type: 'string',
      // driver license format. e.g. first 2 letter A-Z, then 7 digits
      pattern: '^[A-Z]{2}\\d{7}$',
    },
    userId: {
      type: 'number',
    },
  },
};
