import { Cart } from '@entities/cart/cart.entity';

export const getCartFromLocalStorage = (cartBFF: Cart | undefined) => {
  const cartLS = localStorage.getItem('cbff');
  if (cartLS && cartLS !== 'undefined') {
    return JSON.parse(cartLS);
  } else {
    return cartBFF;
  }
};
