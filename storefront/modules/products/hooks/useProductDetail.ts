import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { ProductAssortmentPathFragment } from '../../assortment/fragments/AssortmentPath';
import ProductFragment from '../fragments/ProductFragment';
import ProductPriceFragment from '../fragments/ProductPriceFragment';

const PRODUCT_DETAIL_QUERY = gql`
  query ProductDetails($slug: String) {
    product(slug: $slug) {
      assortmentPaths {
        ...ProductAssortmentPathFragment
      }
      ...ProductDetails
      ...ProductPriceFragment
    }
  }
  ${ProductFragment}
  ${ProductPriceFragment}
  ${ProductAssortmentPathFragment}
`;

const useProductDetail = ({ slug }) => {
  const { data, loading, error } = useQuery<any>(PRODUCT_DETAIL_QUERY, {
    variables: { slug },
  });

  const paths = (data?.product?.assortmentPaths || []).flat().pop()?.links;

  return {
    product: data?.product,
    paths,
    loading,
    error,
  };
};

export default useProductDetail;
