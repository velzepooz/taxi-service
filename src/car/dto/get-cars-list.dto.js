import { paginationDto } from '../../shared/pagination.dto.js';

export const getCarsListDto = {
  ...paginationDto,
  properties: {
    ...paginationDto.properties,
    search: {
      type: 'string',
    },
  },
};
