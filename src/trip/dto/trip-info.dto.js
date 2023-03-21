export const tripInfoDto = {
  type: 'object',
  properties: {
    destinationAddress: {
      type: 'string',
    },
    departureAddress: {
      type: 'string',
    },
    distance: {
      type: 'number',
    },
    price: {
      type: 'number',
    },
    duration: {
      type: 'number',
    },
  },
};
