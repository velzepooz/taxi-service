import { accessTokenHook } from '../hooks.js';
import { paginationDto } from '../shared/pagination.dto.js';

/**
 * @param {DiContainer} container
 * @returns {FastifyRoute[]}
 */
export const initCarController = (container) => {
  const { carService } = container;
  const urlPrefix = '/car';

  const getCarsListRoute = {
    method: 'GET',
    schema: {
      querystring: paginationDto,
    },
    url: `${urlPrefix}/list`,
    onRequest: accessTokenHook,
    handler: async (request, reply) => {
      const { page, perPage } = request.query;

      const cars = await carService.getCarsList(page, perPage);
      reply.code(200).send(cars);
    },
  };

  return [getCarsListRoute];
};
