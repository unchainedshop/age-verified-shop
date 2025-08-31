import { useQuery, gql } from '@apollo/client';
import ProductFragment from '../fragments/ProductFragment';
import ProductPriceFragment from '../fragments/ProductPriceFragment';
import { ProductAssortmentPathFragment } from '../../assortment/fragments/AssortmentPath';
import useUser from '../../auth/hooks/useUser';

export const PRODUCTS_QUERY = gql`
  query Products($limit: Int, $userId: String) {
    searchProducts(filterQuery: [{ key: "userId", value: $userId }]) {
      products(limit: $limit) {
        _id
        assortmentPaths {
          ...ProductAssortmentPathFragment
        }
        ...ProductDetails
        ...ProductPriceFragment
      }
    }
  }
  ${ProductFragment}
  ${ProductPriceFragment}
  ${ProductAssortmentPathFragment}
`;

const useProducts = ({ limit = 50 } = {}) => {
  const { user } = useUser();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: {
      limit,
      userId: user?._id,
    },
  });

  return {
    loading,
    error,
    products: data?.searchProducts?.products || [],
  };
};

export default useProducts;
