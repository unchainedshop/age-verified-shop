import requestAgeVerification from "./requestAgeVerification.ts";
import SwiyuVerifierManagementResponse from "./SwiyuVerifierManagementResponse.ts";

export default [
  {
    Subscription: {
      requestAgeVerification,
    },
    SwiyuVerifierManagementResponse,
  },
];
