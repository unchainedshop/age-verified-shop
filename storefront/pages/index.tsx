import { useIntl } from 'react-intl';

import Image from 'next/image';

import MetaTags from '../modules/common/components/MetaTags';
import defaultNextImageLoader from '../modules/common/utils/defaultNextImageLoader';
import useProducts from '../modules/products/hooks/useProducts';
import useAssortments from '../modules/assortment/hooks/useAssortments';
import ProductList from '../modules/products/components/ProductList';
import CategoryListItem from '../modules/assortment/components/CategoryListItem';
import Loading from '../modules/common/components/Loading';
import ListViewWrapper from '../modules/common/components/ListViewWrapper';

const Home = () => {
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts({ limit: 20 });
  const { assortments, loading: assortmentsLoading } = useAssortments({
    includeLeaves: true,
  });
  const { formatMessage } = useIntl();

  return (
    <>
      <MetaTags title={formatMessage({ id: 'home', defaultMessage: 'Home' })} />
      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Demo Store Notice */}
        <div className="w-screen ml-[calc(-50vw+50%)] bg-gradient-to-r from-[#eb0273] to-[#f0172f]">
          <div className="flex flex-wrap gap-3 items-center justify-center px-4 py-3 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-white flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-white">
                {formatMessage({
                  id: 'demo_store_notice',
                  defaultMessage:
                    'Demo Store: No real orders are processed. This is for demonstration purposes only.',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section
          id="hero-section"
          className="relative w-screen ml-[calc(-50vw+50%)]"
        >
          <div className="relative h-[30vh] lg:h-[40vh] w-full">
            <Image
              src="cover.png"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
              quality={100}
              alt={formatMessage({ id: 'hero', defaultMessage: 'Hero' })}
              loader={defaultNextImageLoader}
              priority
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="px-4 sm:px-6 lg:px-8 mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
                {formatMessage({
                  id: 'browse_categories',
                  defaultMessage: 'Browse Categories',
                })}
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                {formatMessage({
                  id: 'categories_subtitle',
                  defaultMessage:
                    'Explore our wide range of product categories',
                })}
              </p>
            </div>
          </div>

          {assortmentsLoading ? (
            <div className="px-4 sm:px-6 lg:px-8">
              <Loading />
            </div>
          ) : (
            <div className="pb-4 grid grid-cols-1 gap-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {assortments.map((category) => (
                <div key={category._id} className="transition-all duration-300">
                  <CategoryListItem category={category} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Products Section */}
        <section className="w-screen ml-[calc(-50vw+50%)] py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
          <div className="container px-6 lg:px-8 mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
                {formatMessage({
                  id: 'all_products',
                  defaultMessage: 'All Products',
                })}
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                {formatMessage({
                  id: 'products_subtitle',
                  defaultMessage: 'Discover our complete collection',
                })}
              </p>
            </div>

            {productsLoading ? (
              <Loading />
            ) : productsError ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">
                  Error loading products: {productsError.message}
                </p>
              </div>
            ) : products.length > 0 ? (
              <ListViewWrapper>
                {(viewMode) => (
                  <ProductList
                    products={products}
                    totalProducts={products.length}
                    viewMode={viewMode}
                    onLoadMore={() => {
                      // Load more functionality would be implemented here
                      // For now, this is a placeholder since the home page shows a fixed set
                    }}
                  />
                )}
              </ListViewWrapper>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">
                  {formatMessage({
                    id: 'no_products',
                    defaultMessage: 'No products available',
                  })}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
