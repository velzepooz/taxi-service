import { FastifyRequest } from 'fastify';

export type RequestWithUserId = FastifyRequest & {
  userId: number;
}
