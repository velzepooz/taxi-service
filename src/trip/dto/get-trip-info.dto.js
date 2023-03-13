export const getTripInfoDto = {
  type: 'object',
  properties: {
    destLat: {
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
    destLong: {
      type: 'number',
      maximum: 180,
      minimum: -180,
    },
    depLat: {
      type: 'number',
      minimum: -90,
      maximum: 90,
    },
    depLong: {
      type: 'number',
      maximum: 180,
      minimum: -180,
    },
  },
  required: ['destLat', 'destLong', 'depLong', 'depLat'],
  additionalProperties: false,
};
