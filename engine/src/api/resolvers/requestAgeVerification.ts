import { log } from "@unchainedshop/logger";
import type { Context } from "@unchainedshop/api";
import { pubSub } from "../bus.ts";

const { SWIYU_VERIFIER_ENDPOINT } = process.env;

export default {
  subscribe: async function (root: unknown, { force }: never, context: Context) {
    const { user, userId } = context;
    log(`subscription requestAgeVerification`, { userId });

    if (!userId) throw new Error("Login required");

    if (user?.meta?.ageVerification?.requestId) {
      try {
        // Try re-using the last verification request
        const response = await fetch(
          `${SWIYU_VERIFIER_ENDPOINT}/verifications/${user.meta.ageVerification.requestId}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          const subscription = pubSub.subscribe(`verifier-response:${data.id}`);
            setTimeout(() => {
              pubSub.publish(`verifier-response:${data.id}`, data);
            }, 100);
          if (data.state === "PENDING" || !force) {
            return subscription;
          }
        }
      } catch (e) {
        log(e);
      }
    }

    const response = await fetch(`${SWIYU_VERIFIER_ENDPOINT}/verifications`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // accepted_issuer_dids: [
        //   "did:tdw:QmRSJNTEM1PkmiD6fcfAFdZERmzqVkok6xwmx9XyvgckxX:identifier-reg-a.trust-infra.swiyu-int.admin.ch:api:v1:did:5caa5372-34b5-4a47-9744-55ba8e680ed0",
        // ],
        jwt_secured_authorization_request: false,
        presentation_definition: {
          id: "00000000-0000-0000-0000-000000000000",
          name: "Altersverifizierung",
          purpose:
            "Wir müssen zuerst überprüfen, welche Produkte wir dir anbieten können.",
          input_descriptors: [
            {
              id: "11111111-1111-1111-1111-111111111111",
              name: "Altersverifizierung",
              format: {
                "vc+sd-jwt": {
                  "sd-jwt_alg_values": ["ES256"],
                  "kb-jwt_alg_values": ["ES256"],
                },
              },
              constraints: {
                fields: [
                  {
                    path: ["$.vct"],
                    filter: {
                      type: "string",
                      const: "betaid-sdjwt",
                    },
                  },
                  {
                    path: ["$.age_over_18"],
                  },
                  {
                    path: ["$.age_over_16"],
                  },
                ],
              },
            },
          ],
        },
      }),
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to request age verification: ${await response.text()}`
      );
    }

    const data = await response.json();
    const subscription = pubSub.subscribe(`verifier-response:${data.id}`);

    await context.modules.users.updateProfile(userId, {
      meta: {
        ageVerification: {
          requestId: data.id,
          timestamp: new Date(),
        },
      },
    });

    setTimeout(() => {
      pubSub.publish(`verifier-response:${data.id}`, data);
    }, 100);
    return subscription;
  },
  resolve: (payload) => payload,
};
