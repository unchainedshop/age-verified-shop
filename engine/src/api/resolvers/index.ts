import checkAgeVerification from "./checkAgeVerification.ts";
import requestAgeVerification from "./requestAgeVerification.ts";
import SwiyuVerifierManagementResponse from "./SwiyuVerifierManagementResponse.ts";
import User from "./User.ts";

export default [
  {
    Subscription: {
      requestAgeVerification,
    },
    Mutation: {
      checkAgeVerification,
    },
    SwiyuVerifierManagementResponse,
    User
  },
];
