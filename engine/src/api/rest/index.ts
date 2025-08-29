import type { FastifyInstance } from 'fastify';
import swiyuCallbackHandler from './swiyu-callback.ts';

export default (fastify: FastifyInstance) => {
  fastify.post('/rest/swiyu-callback', swiyuCallbackHandler);
};
