import type { FastifyInstance } from 'fastify';
import swiyuCallbackHandler from './swiyu-callback.ts';
import { allocateJob, finishJob, printJob } from "./cloudprnt/index.ts";
import template from "./cloudprnt/template.ts";

export default (fastify: FastifyInstance) => {
  fastify.post("/rest/cloudprnt", allocateJob);
  fastify.delete("/rest/cloudprnt", finishJob);
  fastify.get("/rest/cloudprnt", printJob(template, "thermal2"));
  
  fastify.post('/rest/swiyu-callback', swiyuCallbackHandler);
};
