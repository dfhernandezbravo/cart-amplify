import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Desktop from '@components/layouts/desktop';
import CartContainer from '@modules/cart/components/organisms/CartContainer';

//Hooks
import cartSlice from '@store/cart';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import getCart from '@use-cases/cart/get-cart';
import WindowsEvents from '@events/index';
import useEventListener from '@hooks/eventListenerHooks';

const CartDesktop = () => {
  const { addCartId } = cartSlice.actions;
  const { query } = useRouter();
  const { cartId } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    const queryCartId = query.cartId as string;
    if (cartId === queryCartId) return;

    dispatch(addCartId(queryCartId));
    dispatch(getCart({ cartId: queryCartId }));
  }, []);

  return (
    <Desktop>
      <CartContainer />
    </Desktop>
  );
};

export default CartDesktop;
