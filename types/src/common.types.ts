import { FastifyRequest, RouteOptions as FastifyRoute } from 'fastify';
import {DiContainer} from './di-container';

export type RequestWithUserId = FastifyRequest & {
  userId: number;
}

export type initController = (container: DiContainer) => FastifyRoute[];
