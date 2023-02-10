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
    carColor: {
      type: 'string',
      enum: [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'violet',
        'pink',
        'black',
        'brown',
        'grey',
        'white',
      ],
    },
    carVRN: {
      type: 'string',
      // car vehicle registration number format. e.g. first 2 letter A-Z, then 4 digits
      pattern: '^[A-Z]{2}\\d{5}$',
    },
    userId: {
      type: 'number',
    },
    carId: {
      type: 'number',
    },
  },
};
