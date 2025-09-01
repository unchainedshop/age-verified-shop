import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/assortment';
import AssortmentMediaFragment from '../fragments/AssortmentMedia';
import useUser from '../../auth/hooks/useUser';

export const ASSORTMENTS_QUERY = gql`
  query AssortmentsQuery($queryString: String) {
    searchAssortments(queryString: $queryString) {
      assortments {
        ...AssortmentFragment
        media {
          ...AssortmentMediaFragment
        }
      }
    }
  }
  ${AssortmentFragment}
  ${AssortmentMediaFragment}
`;

const useAssortments = ({ includeLeaves = false } = {}) => {
  const { user } = useUser();
  const { data, loading, error } = useQuery(ASSORTMENTS_QUERY, {
    variables: {
      includeLeaves,
      queryString: user?._id,
    },
    skip: !user?._id,
  });

  return {
    loading,
    error,
    assortments: data?.searchAssortments?.assortments || [],
  };
};

export default useAssortments;
