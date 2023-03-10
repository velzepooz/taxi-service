import { FastifyRequest } from 'fastify';
import {FastifyRoute} from '../../src/app.module';
import {DiContainer} from './di-container';

export type RequestWithUserId = FastifyRequest & {
  userId: number;
}

export type initController = (container: DiContainer) => FastifyRoute[];
