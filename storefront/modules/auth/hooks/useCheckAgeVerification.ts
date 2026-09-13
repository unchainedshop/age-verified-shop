import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

export const CHECK_AGE_VERIFICATION = gql`
  mutation CheckAgeVerification($requestId: ID!) {
    checkAgeVerification(requestId: $requestId) {
      _id
      state
      presentationDefinition
      verificationLink
      verificationDeepLink
    }
  }
`;

const useCheckAgeVerification = () => {
  const [checkAgeVerificationMutation, { loading, error }] = useMutation<any>(
    CHECK_AGE_VERIFICATION,
  );

  const checkAgeVerification = async (requestId) => {
    const { data } = await checkAgeVerificationMutation({
      variables: {
        requestId,
      },
    });
    return data?.checkAgeVerification;
  };

  return {
    checkAgeVerification,
    error,
    loading,
  };
};

export default useCheckAgeVerification;
