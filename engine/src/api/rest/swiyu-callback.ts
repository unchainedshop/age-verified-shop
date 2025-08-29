import type { FastifyRequest, FastifyReply } from "fastify";
import { pubSub } from "../bus.ts";

export default async function swiyuCallbackHandler(
  request: FastifyRequest<{
    Body: {
      verification_id: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    request.log.info(`Received Swiyu callback for: ${request.body.verification_id}`);
    const response = await fetch(
      `https://swiyu.unchained.wtf/management/api/verifications/${request.body.verification_id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch age verification status: ${await response.text()}`
      );
    }
    const data = await response.json();
    pubSub.publish(
      `verifier-response:${request.body.verification_id}`,
      data
    );
    return reply.code(200).send();
  } catch (e) {
    request.log.error(e);
    return reply.code(403).send({
      error: e.message,
      success: false,
      token: null,
    });
  }
}
