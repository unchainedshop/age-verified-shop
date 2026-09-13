import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import CurrentUserFragment from '../fragments/CurrentUserFragment';

export const USER_QUERY = gql`
  query User {
    me {
      ...CurrentUser
    }
  }
  ${CurrentUserFragment}
`;

const useUser = () => {
  const { data, loading, error, refetch, previousData } =
    useQuery<any>(USER_QUERY);

  return {
    loading,
    error,
    user: data?.me || previousData?.me,
    cart: data?.me?.cart,
    refetch,
  };
};

export default useUser;
