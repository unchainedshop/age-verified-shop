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

    extend type User {
      ageVerification: JSON
    }

    extend type Mutation {
      checkAgeVerification(requestId: ID!): SwiyuVerifierManagementResponse!
    }

    type Subscription {
      requestAgeVerification(force: Boolean): SwiyuVerifierManagementResponse!
    }
  `,
];
