import { Cart, Item, ProductAvailability } from '@entities/cart/cart.entity';

export const getUnavailableProduct = (cart: Cart) => {
  const productWithoutStock: Item[] = [];
  const productCannotBeDelivered: Item[] = [];

  cart?.items?.forEach((item, index) => {
    const availability = item.product.availability;

    if (availability === ProductAvailability.CANNOTBEDELIVERED) {
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

  console.log({ productCannotBeDelivered, productWithoutStock });
  return {
    productCannotBeDelivered,
    productWithoutStock,
    joinProductUnavailable,
  };
};
