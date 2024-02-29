import { Cart, Item, ProductAvailability } from '@entities/cart/cart.entity';

export const getUnavailableProduct = (cart: Cart) => {
  const productWithoutStock: Item[] = [];
  const productCannotBeDelivered: Item[] = [];

  cart?.items?.forEach((item, index) => {
    const availability = item.product.availability;

    if (
      availability === ProductAvailability.CANNOTBEDELIVERED ||
      ProductAvailability.UNAVAILABLE_ITEM_FULFILLMENT
    ) {
      const product = {
        ...item,
        index,
      };
      productCannotBeDelivered.push(product);
    } else if (availability === ProductAvailability.WITHOUTSTOCK) {
      const product = {
        ...item,
        index,
      };
      productWithoutStock.push(product);
    }
  });

  const joinProductUnavailable = [
    ...productCannotBeDelivered,
    ...productWithoutStock,
  ];

  return {
    productCannotBeDelivered,
    productWithoutStock,
    joinProductUnavailable,
  };
};
