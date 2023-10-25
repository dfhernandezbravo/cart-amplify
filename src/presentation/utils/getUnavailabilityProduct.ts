import { Cart, Item, ProductAvailability } from '@entities/cart/cart.entity';

export const getUnavailableProduct = (cart: Cart) => {
  const itemWithoutStock: Item[] | never = [];

  cart?.items?.forEach((item, index) => {
    const availability = item.product.availability;
    if (
      availability === ProductAvailability.WITHOUTSTOCK ||
      availability === ProductAvailability.CANNOTBEDELIVERED ||
      availability === ProductAvailability.UNAVAILABLE_ITEM_FULFILLMENT
    ) {
      const product = {
        ...item,
        index,
      };
      itemWithoutStock.push(product);
    }
  });
  return itemWithoutStock;
};
