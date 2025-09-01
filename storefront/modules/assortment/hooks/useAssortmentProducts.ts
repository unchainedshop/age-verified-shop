import { useQuery, gql } from '@apollo/client';
import ProductFragment from '../../products/fragments/ProductFragment';
import ProductPriceFragment from '../../products/fragments/ProductPriceFragment';
import AssortmentFragment from '../fragments/assortment';
import AssortmentMediaFragment from '../fragments/AssortmentMedia';
import AssortmentPathFragment from '../fragments/AssortmentPath';
import useUser from '../../auth/hooks/useUser';

export const ASSORTMENT_PRODUCTS_QUERY = gql`
  query AssortmentsProducts(
    $userId: String
    $slugs: String!
    $offset: Int
    $limit: Int
  ) {
    assortment(slug: $slugs) {
      ...AssortmentFragment
      assortmentPaths {
        ...AssortmentPathFragment
      }
      media {
        ...AssortmentMediaFragment
      }
      searchProducts(filterQuery: [{ key: "userId", value: $userId }]) {
        filteredProductsCount
        productsCount
        products(offset: $offset, limit: $limit) {
          ...ProductDetails
          ...ProductPriceFragment
        }
      }
    }
  }
  ${ProductPriceFragment}
  ${AssortmentFragment}
  ${ProductFragment}
  ${AssortmentPathFragment}
  ${AssortmentMediaFragment}
`;

const useAssortmentProducts = (
  { slugs }: { slugs: string[] | string } = {
    slugs: [],
  },
) => {
  const { user } = useUser();
  const { data, loading, error, fetchMore } = useQuery(
    ASSORTMENT_PRODUCTS_QUERY,
    {
      variables: {
        userId: user?._id,
        slugs,
        offset: 0,
        limit: 10,
      },
    },
  );
  const paths = (data?.assortment?.assortmentPaths || []).flat().pop()?.links;
  const products = data?.assortment?.searchProducts.products || [];
  const loadMore = () => {
    fetchMore({
      variables: {
        offset: products.length,
        slugs,
        limit: 10,
      },
    });
  };

  return {
    loading,
    loadMore,
    error,
    filteredProducts: data?.assortment?.searchProducts.filteredProductsCount,
    assortment: data?.assortment || {},
    products,
    paths,
  };
};

export default useAssortmentProducts;
