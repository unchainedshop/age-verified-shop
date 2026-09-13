import { gql } from '@apollo/client';
import { useMutation, useApolloClient } from '@apollo/client/react';

export const LOGIN_AS_GUEST_MUTATION = gql`
  mutation LoginAsGuest {
    loginAsGuest {
      _id
      tokenExpires
    }
  }
`;

const useLoginAsGuest = () => {
  const client = useApolloClient();
  const [loginAsGuestMutation, props] = useMutation<any>(
    LOGIN_AS_GUEST_MUTATION,
  );

  const loginAsGuest = async () => {
    console.log('Logging in as guest...');
    const result = await loginAsGuestMutation({
      awaitRefetchQueries: true,
    });
    await client.resetStore();
    return result;
  };

  return {
    loginAsGuest,
    ...props,
  };
};

export default useLoginAsGuest;
