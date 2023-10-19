import { useEffect } from 'react';
import Desktop from '@components/layouts/desktop';
import CartAsideContainer from '@modules/cartAside/components/organisms/CartAsideContainer';

import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import getCart from '@use-cases/cart/get-cart';

const CartAsideDesktop = () => {
  const { cartId } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cartId) {
      dispatch(getCart({ cartId }));
    }
  }, [cartId]);

  return (
    <Desktop>
      <CartAsideContainer />
    </Desktop>
  );
};

export default CartAsideDesktop;
