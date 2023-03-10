import { paginationDto } from '../../utils/pagination.dto.js';

export const getCarsListDto = {
  ...paginationDto,
  properties: {
    ...paginationDto.properties,
    search: {
      type: 'string',
    },
  },
};
