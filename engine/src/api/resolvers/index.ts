import requestAgeVerification from "./requestAgeVerification.ts";
import SwiyuVerifierManagementResponse from "./SwiyuVerifierManagementResponse.ts";
import User from "./User.ts";

export default [
  {
    Subscription: {
      requestAgeVerification,
    },
    SwiyuVerifierManagementResponse,
    User
  },
];
