/** @typedef {import('fastify').RouteOptions} FastifyRoute */
/** @typedef {import('./driver.service').DriverService} DriverService */

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
      const result = await driverService.createDriver();
      const [code, data] = result ? [200, result] : [204, null];
      res.code(code).send(data);
    },
  };

  return [createDriverRoute];
};
