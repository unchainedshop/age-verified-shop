/**
 * Groups cart items by product ID
 * Combines multiple items of the same product into a single display item
 *
 * @param items - Array of cart items from the backend
 * @returns Array of grouped cart items with combined quantities
 */
export const groupCartItems = (items: any[]) => {
  if (!items || items.length === 0) return [];

  const grouped = new Map();

  items.forEach((item) => {
    const productId = item.product?._id;

    if (!productId) return;

    if (grouped.has(productId)) {
      const existingItem = grouped.get(productId);
      // Sum quantities
      existingItem.quantity += item.quantity;
      // Keep track of all item IDs for operations
      existingItem.itemIds.push(item._id);
      // Update total if needed
      if (item.total) {
        existingItem.total = {
          amount: (existingItem.total?.amount || 0) + (item.total?.amount || 0),
          currencyCode: item.total.currencyCode,
        };
      }
    } else {
      // First item for this product
      grouped.set(productId, {
        ...item,
        itemIds: [item._id], // Array of all item IDs for this product
        originalItemId: item._id, // Keep the first item ID as primary
      });
    }
  });

  return Array.from(grouped.values());
};

export default groupCartItems;
