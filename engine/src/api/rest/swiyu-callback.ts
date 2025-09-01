import type { FastifyRequest, FastifyReply } from "fastify";
import type { Context } from "@unchainedshop/api";
import { pubSub } from "../bus.ts";

const { SWIYU_VERIFIER_ENDPOINT } = process.env;

export default async function swiyuCallbackHandler(
  request: FastifyRequest<{
    Body: {
      verification_id: string;
    };
  }> & { unchainedContext: Context },
  reply: FastifyReply
) {
  try {
    request.log.info(
      `Received Swiyu callback for: ${request.body.verification_id}`
    );
    const response = await fetch(
      `${SWIYU_VERIFIER_ENDPOINT}/verifications/${request.body.verification_id}`,
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

    const user = await request.unchainedContext.modules.users.findUser({
      "meta.ageVerification.requestId": request.body.verification_id,
      includeGuests: true,
    });

    if (data.state === "SUCCESS") {
      await request.unchainedContext.modules.users.updateProfile(user._id, {
        meta: {
          ageVerification: {
            requestId: request.body.verification_id,
            timestamp: new Date(),
            ...data.wallet_response?.credential_subject_data,
          },
        },
      });
    }

    pubSub.publish(`verifier-response:${request.body.verification_id}`, data);
    return reply.code(200).send();
  } catch (e) {
    request.log.error(e);
    return reply.code(200).send({
      error: e.message,
      success: false,
      token: null,
    });
  }
}
