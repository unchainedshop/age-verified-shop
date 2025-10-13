import { useMemo } from 'react';
import useUser from '../../auth/hooks/useUser';

interface AgeVerification {
  age_over_16?: string;
  age_over_18?: string;
  requestId?: string;
  timestamp?: Date;
}

interface Product {
  _id: string;
  tags?: string[];
}

interface ProductAgeCheckResult {
  isAllowed: boolean;
  isRestricted: boolean;
  requiresAge16: boolean;
  requiresAge18: boolean;
  userAge16Verified: boolean;
  userAge18Verified: boolean;
  loading: boolean;
}

/**
 * Hook to check if a product is age-restricted and if the current user
 * is allowed to view/purchase it based on their age verification status.
 *
 * Products with 'spirit' tag require age 18+
 * Products with 'beer-wine' tag require age 16+
 *
 * @param product - The product to check
 * @returns Object containing age verification details
 */
const useProductAgeCheck = (
  product: Product | null | undefined,
): ProductAgeCheckResult => {
  const { user, loading } = useUser();

  return useMemo(() => {
    if (!product) {
      return {
        isAllowed: true,
        isRestricted: false,
        requiresAge16: false,
        requiresAge18: false,
        userAge16Verified: false,
        userAge18Verified: false,
        loading: loading,
      };
    }

    const ageVerification: AgeVerification = user?.ageVerification || {};
    const userAge16Verified = ageVerification.age_over_16 === 'true';
    const userAge18Verified = ageVerification.age_over_18 === 'true';

    console.log('useProductAgeCheck', { userAge16Verified, userAge18Verified });
    const productTags = product.tags || [];
    const requiresAge18 = productTags.includes('spirit');
    const requiresAge16 = productTags.includes('beer-wine');
    const isRestricted = requiresAge16 || requiresAge18;

    let isAllowed = true;

    if (requiresAge18 && !userAge18Verified) {
      isAllowed = false;
    } else if (requiresAge16 && !userAge16Verified && !userAge18Verified) {
      // Age 18+ also satisfies age 16+ requirement
      isAllowed = false;
    }

    return {
      isAllowed,
      isRestricted,
      requiresAge16,
      requiresAge18,
      userAge16Verified,
      userAge18Verified,
      loading,
    };
  }, [product, user?.ageVerification, loading]);
};

export default useProductAgeCheck;
