export function initAppModule(config: Config): AppModule;
export type FastifyRoute = import('fastify').RouteOptions;
export type Config = import('./config').Config;
export type AppModule = {
    services: any[];
    routes: FastifyRoute[];
};
