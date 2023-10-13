import { useEffect } from 'react';
import Desktop from '@components/layouts/desktop';
import CartAsideContainer from '@modules/cartAside/components/organisms/CartAsideContainer';

import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import getCart from '@use-cases/cart/get-cart';
import cartSlice from '@store/cart';

const CartAsideDesktop = () => {
  const { cartId } = useAppSelector((state) => state.cart);
  const { addCartId } = cartSlice.actions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useEffect headless');
    window.addEventListener('message', (event) => {
      console.log('event ', event);
      const key = Object.keys(event?.data);
      if (key?.length > 0 && key[0] === 'HYBRIDATION') {
        localStorage.setItem('isHybridation', event.data.HYBRIDATION);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (cartId) {
  //     dispatch(getCart({ cartId }));
  //   }
  // }, [cartId]);

  useEffect(() => {
    const isHybridation = localStorage.getItem('isHybridation');
    console.log('isHybridation ', isHybridation);
    if (isHybridation) {
      const { cartId: cartIdHybridation, isEnabledMinicart } =
        JSON.parse(isHybridation);
      if (isEnabledMinicart && cartIdHybridation) {
        dispatch(addCartId(cartIdHybridation));
        dispatch(getCart({ cartId: cartIdHybridation }));
      }
    }
  }, [cartId]);

  return (
    <Desktop>
      <CartAsideContainer />
    </Desktop>
  );
};

export default CartAsideDesktop;
