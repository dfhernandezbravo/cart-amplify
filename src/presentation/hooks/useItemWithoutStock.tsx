import { Cart } from '@entities/cart/cart.entity';
import { getUnavailableProduct } from '@utils/getUnavailabilityProduct';
import { useMemo } from 'react';

const useItemWithoutStock = (cart: Cart | undefined) => {
  const itemWithoutStock = useMemo(() => {
    return cart?.items?.length ? getUnavailableProduct(cart) : [];
  }, [cart]);

  return itemWithoutStock;
};

export default useItemWithoutStock;
