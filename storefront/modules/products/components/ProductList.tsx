import { useIntl } from 'react-intl';
import { ChevronDoubleDownIcon, PhotoIcon } from '@heroicons/react/20/solid';
import ProductListItem from './ProductListItemCard';
import Button from '../../common/components/Button';
import ProductListItemRow from './ProductListItemRow';

const ProductList = ({
  products,
  totalProducts,
  onLoadMore,
  viewMode = 'grid',
}) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className="mx-auto max-w-full">
        <h2 className="sr-only">
          {formatMessage({ id: 'products', defaultMessage: 'Products' })}
        </h2>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={`grid-${product?._id}`}
                className="group relative scroll-scale-in"
              >
                <ProductListItem product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={`list-${product?._id}`}
                className="group relative bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-slate-900 dark:border-0 scroll-slide-up"
              >
                <ProductListItemRow product={product} />
              </div>
            ))}
          </div>
        )}

        {totalProducts > products?.length && (
          <div className="items-center py-8 text-center">
            <Button
              icon={<ChevronDoubleDownIcon className="mr-2 h-6 w-6" />}
              text={formatMessage({
                id: 'load_more',
                defaultMessage: 'Load More',
              })}
              aria-label={formatMessage({
                id: 'load_more',
                defaultMessage: 'Load More',
              })}
              type="button"
              className="dark:text-white"
              onClick={onLoadMore}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
