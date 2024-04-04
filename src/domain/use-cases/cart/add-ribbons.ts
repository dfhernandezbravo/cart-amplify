import { Cart } from '@entities/cart/cart.entity';
import { getProductIds } from './get-product-ids';
import productsService from '@services/products';
import getInstanceHttp from './get-instance-http';
import { cartWithRibbons } from './cart-with-ribbons';

const AddRibbonsToItems = async (cart: Cart) => {
  const productIds = getProductIds(cart);
  let cartWithRibbonsAdded = cart;
  if (productIds) {
    const productsWithRibbons = await productsService(
      getInstanceHttp(),
    ).getProductsByIds(productIds);
    cartWithRibbonsAdded = cartWithRibbons(cart, productsWithRibbons.data);
  }

  return cartWithRibbonsAdded;
};

export default AddRibbonsToItems;