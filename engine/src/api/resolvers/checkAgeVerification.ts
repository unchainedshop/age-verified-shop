import { log } from "@unchainedshop/logger";
import type { Context } from "@unchainedshop/api";
import { pubSub } from "../bus.ts";

const { SWIYU_VERIFIER_ENDPOINT } = process.env;

export default async function checkAgeVerification(root: never, { requestId: forcedRequestId }, context: Context) {
  const { user, userId } = context;
  log(`mutation checkAgeVerification`, { userId });

  const requestId = (user?.meta?.ageVerification?.requestId) ? user.meta.ageVerification.requestId : forcedRequestId;

  const response = await fetch(
      `${SWIYU_VERIFIER_ENDPOINT}/verifications/${encodeURIComponent(requestId)}`,
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

    const updatedUser = await context.modules.users.findUser({
      "meta.ageVerification.requestId": requestId,
      includeGuests: true,
    });

    if (data.state === "SUCCESS") {
      await context.modules.users.updateProfile(updatedUser._id, {
        meta: {
          ageVerification: {
            requestId: requestId,
            timestamp: new Date(),
            ...data.wallet_response?.credential_subject_data,
          },
        },
      });
    }

    pubSub.publish(`verifier-response:${requestId}`, data);
    return data;
};
