import { useMutation, useApolloClient, gql } from '@apollo/client';

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
  const [loginAsGuestMutation, props] = useMutation(LOGIN_AS_GUEST_MUTATION);

  const loginAsGuest = async () => {
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
