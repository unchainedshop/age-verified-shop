import { log } from "@unchainedshop/logger";
import type { Context } from "@unchainedshop/api";
import { pubSub } from "../bus.ts";

const primitiveUpdater = async (requestId) => {
  const response = await fetch(
    `https://swiyu.unchained.wtf/management/api/verifications/${requestId}`,
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
  console.log(data);
  pubSub.publish(`verifier-response:${requestId}`, data);
};

export default {
  subscribe: async function (root: unknown, _: never, context: Context) {
    log(`subscription requestAgeVerification`);

    const response = await fetch(
      "https://swiyu.unchained.wtf/management/api/verifications",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // accepted_issuer_dids: [
          //   "did:tdw:QmRSJNTEM1PkmiD6fcfAFdZERmzqVkok6xwmx9XyvgckxX:identifier-reg-a.trust-infra.swiyu-int.admin.ch:api:v1:did:5caa5372-34b5-4a47-9744-55ba8e680ed0",
          // ],
          jwt_secured_authorization_request: true,
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
                // format: {
                //   ldp_vc: {
                //     proof_type: ["Ed25519Signature2018"],
                //   },
                // },
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
                  ],
                },
              },
            ],
          },
        }),
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Failed to request age verification: ${await response.text()}`
      );
    }

    const data = await response.json();    
    const subscription = pubSub.subscribe(`verifier-response:${data.id}`);

    setTimeout(() => {
      pubSub.publish(`verifier-response:${data.id}`, data);
    }, 100);
    setInterval(() => primitiveUpdater(data.id), 5000);
    return subscription;
  },
  resolve: (payload) => payload,
};
