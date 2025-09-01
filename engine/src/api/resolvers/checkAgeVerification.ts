import type { Context } from "@unchainedshop/api";
import { pubSub } from "../bus.ts";

const { SWIYU_VERIFIER_ENDPOINT } = process.env;

export default async function checkAgeVerification(root: never, { requestId }, context: Context) {
  const response = await fetch(
      `${SWIYU_VERIFIER_ENDPOINT}/verifications/${requestId}`,
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

    const user = await context.modules.users.findUser({
      "meta.ageVerification.requestId": requestId,
      includeGuests: true,
    });

    if (data.state === "SUCCESS") {
      await context.modules.users.updateProfile(user._id, {
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
