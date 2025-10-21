import {
  DeliveryAdapter,
  DeliveryDirector,
  OrderPricingSheet,
  ProductPricingSheet,
  type IDeliveryAdapter,
} from "@unchainedshop/core";
import {
  DeliveryProviderType,
  type DeliveryLocation,
} from "@unchainedshop/core-delivery";

const StartupNightsLocation: DeliveryLocation = {
  _id: "default-location",
  name: "Startup Nights",
  address: {
    addressLine: "Eulachhalle",
    postalCode: "8400",
    city: "Winterthur",
    countryCode: "CH",
  },
  geoPoint: {
    latitude: 47.4992,
    longitude: 8.7486,
  },
};

const PickupStartupNights: IDeliveryAdapter = {
  ...DeliveryAdapter,

  key: "shop.unchained.pickup.startup-nights",
  label: "Pickup at Startup Nights",
  version: "1.0",

  typeSupported: (type) => {
    return type === DeliveryProviderType.PICKUP;
  },

  actions: (config, context) => {
    return {
      ...DeliveryAdapter.actions(config, context),

      isAutoReleaseAllowed() {
        return true;
      },

      isActive() {
        return true;
      },

      configurationError() {
        return null;
      },

      pickUpLocationById: async () => StartupNightsLocation,

      pickUpLocations: async () => [StartupNightsLocation],

      send: async () => {
        const { modules, order } = context;

        const pricing = OrderPricingSheet(order);
        const orderItems = await modules.orders.positions.findOrderPositions({ orderId: order._id });
        const items = [];

        for (const item of orderItems) {
          const productPricing = ProductPricingSheet(item);
          const productText = await modules.products.texts.findLocalizedText({
            productId: item.productId,
            locale: modules.users.userLocale(order.context.user),
          })
          items.push({
            name: productText.title,
            quantity: item.quantity || 1,
            price: (productPricing.total({}).amount || 0) / 100,
          });
        }

        await modules.worker.addWork({
          type: "CLOUDPRNT",
          retries: 0,
          input: {
            comment: order?.context?.comment || "",
            total: (pricing.total().amount || 0) / 100,
            orderNumber: order.orderNumber,
            orderDate: order.ordered,
            items,
          },
        });

        return false;
      },
    };
  },
};

DeliveryDirector.registerAdapter(PickupStartupNights);
