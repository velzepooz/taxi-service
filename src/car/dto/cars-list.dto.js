import { carDto } from './car.dto.js';

export const carsListDto = {
  type: 'object',
  properties: {
    cars: { type: 'array', items: carDto },
    currentPage: {
      type: 'number',
    },
    totalPages: {
      type: 'number',
    },
  },
};
