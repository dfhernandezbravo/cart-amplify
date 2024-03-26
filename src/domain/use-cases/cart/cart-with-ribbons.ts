import { Cart } from '@entities/cart/cart.entity';
import { Product } from '@cencosud-ds/easy-design-system';

export const cartWithRibbons = (cart: Cart, productsWithRibbons: Product[]) => {
  const updatedItems = cart.items.map((item: any) => {
    let matchingProduct = productsWithRibbons.find(
      (product: any) => product.productId === item.product.productId,
    );
    if (matchingProduct) {
      return {
        ...item,
        product: {
          ...item.product,
          ribbons: matchingProduct.ribbons,
        },
      };
    }
    return item;
  });

  return {
    ...cart,
    items: updatedItems,
  };
};
