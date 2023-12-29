import { Cart } from '@entities/cart/cart.entity';
import { getUnavailableProduct } from '@utils/getUnavailabilityProduct';

const useItemWithoutStock = (cart: Cart) => {
  const {
    productCannotBeDelivered,
    productWithoutStock,
    joinProductUnavailable,
  } = getUnavailableProduct(cart);
  return {
    productCannotBeDelivered,
    productWithoutStock,
    joinProductUnavailable,
  };
};

export default useItemWithoutStock;
