import {
  FilterDirector,
  FilterAdapter,
  type UnchainedCore,
  type IFilterAdapter,
} from '@unchainedshop/core';

const AgeRestriction: IFilterAdapter = {
  ...FilterAdapter,

  key: 'ch.age.limited',
  label: 'Limitiere Scope für User',
  version: '1.0',
  orderIndex: 11,

  actions: (rawContext) => {
    const context = rawContext as typeof rawContext & UnchainedCore & { user };
    const { searchQuery } = context;

    const userId = searchQuery?.filterQuery?.find((q) => q.key === 'userId')?.value;

    return {
      ...FilterAdapter.actions(context),

      async searchProducts({ productIds }) {
        if (!productIds) return productIds;

        const user = await context.modules.users.findUserById(userId);
        const isAge16OrAbove = user.meta?.ageVerification?.age_over_16 === 'true';
        const isAge18OrAbove = user.meta?.ageVerification?.age_over_18 === 'true';

        if (isAge18OrAbove) return productIds;

        const restrictedSpirits = await context.modules.products.findProductIds({
            "tags": ["spirit"]
        }) || [];

        const restrictedBeers = !isAge16OrAbove ? await context.modules.products.findProductIds({
            "tags": ["beer-wine"]
        }) : [];

        const restrictedIds =  [...restrictedBeers, ...restrictedSpirits];

        return productIds.filter((id) => {
        //   const isPartOfBlacklist = blacklistedProductIds.includes(id);
        //   const isPartOfWhitelist = whitelistedProductIds.includes(id);
          const isAllowed = !restrictedIds || !restrictedIds.includes(id);

          if (isAllowed) {
            // All id's that are part of the whitelist shall be part of the resultset
            // even if the id actually belonged to the blacklist
            return true;
          }
          // No whitelist, so reduce the result set by the blacklist
          return false;
        });
      }
    }
  },
};

FilterDirector.registerAdapter(AgeRestriction);
