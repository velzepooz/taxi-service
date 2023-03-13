import { accessTokenHook } from '../hooks.js';
import { getTripInfoDto } from './dto/get-trip-info.dto.js';
import { tripInfoDto } from './dto/trip-info.dto.js';

/**
 * @type {import('../../types/src/common.types').initController}
 */
export const initTripController = (container) => {
  const { tripService } = container;
  const urlPrefix = '/trip';

  const getTripCalculationInfoRoute = {
    method: 'GET',
    schema: {
      querystring: getTripInfoDto,
      response: {
        default: tripInfoDto,
      },
    },
    url: `${urlPrefix}/calculate`,
    onRequest: accessTokenHook,
    handler: async (request, reply) => {
      const tripInfo = await tripService.getTripCalculationInfo(request.query);
      reply.status(200).send(tripInfo);
    },
  };

  return [getTripCalculationInfoRoute];
};
