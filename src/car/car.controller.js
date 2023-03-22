/**
 * @typedef {import('../../types/src/di-container').DiContainer} DiContainer
 * @typedef {import('fastify').RouteOptions} FastifyRoute
 */
import { accessTokenHook } from '../hooks.js';
import { getCarsListDto } from './dto/get-cars-list.dto.js';
import { carsListDto } from './dto/cars-list.dto.js';

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
      querystring: getCarsListDto,
      response: {
        default: carsListDto,
      },
    },
    url: `${urlPrefix}/list`,
    // onRequest: accessTokenHook,
    handler: async (request, reply) => {
      const cars = await carService.getCarsList(request.query);
      reply.code(200).send(cars);
    },
  };

  return [getCarsListRoute];
};
