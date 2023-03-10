/**
 *  @typedef {import('fastify').RouteOptions} FastifyRoute
 *  @typedef {import('../../types/src/driver/driver.service').DriverService} DriverService
 *   @typedef {import('../../types/src/di-container').DiContainer} DiContainer
 */

import { accessTokenHook } from '../hooks.js';
import { CreateDriverDto } from './dto/create-driver.dto.js';

/**
 * @param {DiContainer} container
 * @returns {FastifyRoute[]}
 */
export const initDriverController = (container) => {
  const { driverService } = container;
  const urlPrefix = '/driver';

  const createDriverProfileRoute = {
    method: 'POST',
    schema: {
      body: CreateDriverDto,
    },
    url: `${urlPrefix}/create`,
    onRequest: accessTokenHook,
    handler: async (request, reply) => {
      /** @type {import('../../types/src/driver/dto/create-driver.dto').CreateDriverDto} */
      const payload = request.body;
      const driver = await driverService.createDriver(payload, request.userId);

      reply.code(201).send(driver);
    },
  };

  return [createDriverProfileRoute];
};
