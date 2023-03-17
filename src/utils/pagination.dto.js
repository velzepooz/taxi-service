export const paginationDto = {
  type: 'object',
  properties: {
    page: {
      type: 'number',
      default: 1,
      minimum: 1,
    },
    perPage: {
      type: 'number',
      default: 30,
      minimum: 1,
    },
    additionalProperties: false,
  },
};
