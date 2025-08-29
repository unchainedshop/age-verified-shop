export default [
  /* GraphQL */ `
    enum SwiyuVerificationStatus {
      PENDING
      SUCCESS
      FAILED
    }

    type SwiyuVerifierManagementResponse {
      _id: ID!
      state: SwiyuVerificationStatus!
      presentationDefinition: JSON!
      verificationLink: String!
      verificationDeepLink: String!
    }

    type Subscription {
      requestAgeVerification: SwiyuVerifierManagementResponse!
    }
  `,
];
