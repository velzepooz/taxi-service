/** @typedef {import('fastify').RouteOptions} FastifyRoute */
/** @typedef {import('./driver.service').DriverService} DriverService */

import { createArticleDto } from '../article/dto/article.dto.js';

/**
 * @param {DriverService} driverService
 * @returns {FastifyRoute[]}
 */
export const initDriverController = (driverService) => {
  const urlPrefix = 'driver';

  const createDriverRoute = {
    method: 'POST',
    url: `/${urlPrefix}`,
    schema: {
      body: createArticleDto,
    },
    handler: async (req, res) => {
      /** @type {*} CreateDriverDto */
      const payload = req.body;
      const result = await driverService.createDriver(payload);
      const [code, data] = result ? [200, result] : [204, null];
      res.code(code).send(data);
    },
  };

  return [createDriverRoute];
};
