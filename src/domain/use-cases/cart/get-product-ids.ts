import { Cart } from '@entities/cart/cart.entity';

export const getProductIds = (cart: Cart) => {
  const productIds = cart?.items
    ?.filter((item) => {
      if (item.product.availability === 'available') return item.product.id;
    })
    .map((item) => item.product.id);
  return productIds.toString();
};
