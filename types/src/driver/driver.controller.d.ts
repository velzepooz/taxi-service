export function initDriverController(): FastifyRoute[];
export type FastifyRoute = import('fastify').RouteOptions;
export type DriverService = import('./driver.service').DriverService;
