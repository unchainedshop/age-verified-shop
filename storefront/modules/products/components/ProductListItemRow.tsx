import { PhotoIcon } from '@heroicons/react/20/solid';
import Image from 'next/legacy/image';
import Link from 'next/link';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import ProductPrice from '../../common/components/ProductPrice';
import getProductHref from '../../common/utils/getProductHref';
import { useIntl } from 'react-intl';
import useProductAgeCheck from '../hooks/useProductAgeCheck';
import AgeRestrictedContent from '../../auth/components/AgeRestrictedContent';

const ProductListItem = ({ product }) => {
  const { formatMessage } = useIntl();
  const firstMediaUrl = product?.media?.[0]?.file?.url;
  const { isRestricted, loading, isAllowed } = useProductAgeCheck(product);
  const showMilkGlassEffect = loading ? isRestricted : !isAllowed;

  return (
    <div className="lg:flex gap-5">
      <AgeRestrictedContent
        restricted={showMilkGlassEffect}
        className="w-full h-100 lg:h-64 lg:w-48"
      >
        <div className="w-full h-100 lg:h-64 lg:w-48 flex-shrink-0 relative overflow-hidden bg-slate-50 dark:bg-slate-700">
          <Link href={getProductHref(product?.texts?.slug)}>
            {firstMediaUrl ? (
              <Image
                src={firstMediaUrl}
                alt={product?.texts?.title}
                layout="fill"
                objectFit="cover"
                className="transition-all duration-300 group-hover:scale-105"
                loader={defaultNextImageLoader}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <PhotoIcon className="h-8 w-8 text-slate-400 dark:text-slate-500" />
              </div>
            )}
          </Link>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <Link href={getProductHref(product?.texts?.slug)}>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 transition-colors duration-200 hover:text-slate-700 dark:hover:text-slate-200">
                {product?.texts?.title}
              </h3>
            </Link>
            {product?.texts?.subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {product?.texts?.subtitle}
              </p>
            )}
            {product?.texts?.description && (
              <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {product?.texts?.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="text-xl font-semibold text-slate-900 dark:text-white">
            <ProductPrice product={product} />
          </div>
          <Link
            href={getProductHref(product?.texts?.slug)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 transition-colors duration-200 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {formatMessage({
              id: 'view_product_detail',
              defaultMessage: 'View Details',
            })}
          </Link>
        </div>
      </AgeRestrictedContent>
    </div>
  );
};

export default ProductListItem;
