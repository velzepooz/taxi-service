/**
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('fastify').FastifyReply} FastifyReply
 * @typedef {import('fastify').FastifyRequest} FastifyRequest
 * */
import { ApplicationError } from './application.error.js';


/**
 * @this FastifyInstance
 * @param {*} error
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 *
 */
export function httpErrorHandler(error, request, reply) {
  if (error instanceof ApplicationError) {
    return reply.status(512).send({ message: error.message });
  }

  if (error.validation) {
    return reply.status(error.statusCode).send(error);
  }

  this.log.error(error);
  return reply.status(500).send({ message: 'Internal Server Error' });
};
