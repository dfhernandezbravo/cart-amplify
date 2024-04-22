import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { COOKIES } from '@entities/cart/cookies';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import useEventListener from '@hooks/eventListenerHooks';
import WindowsEvents from '@events/index';
import getCart from '@use-cases/cart/get-cart';

interface Props {
  children: React.ReactNode;
}

const CartAsideProvider = ({ children }: Props) => {
  const { cartBFF, cartId } = useAppSelector((state) => state.cart);
  const channel = cartBFF?.channel;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!channel) return;
    Cookies.set(COOKIES.CHANNEL, channel);
  });

  const updateShippingCart = () => {
    if (cartId) {
      dispatch(getCart({ cartId }));
    }
  };

  useEventListener(
    document,
    WindowsEvents.UPDATE_SHIPPING_CART,
    updateShippingCart,
  );

  return <>{children}</>;
};

export default CartAsideProvider;
