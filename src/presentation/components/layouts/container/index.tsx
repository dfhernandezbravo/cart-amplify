import SkeletonCartPage from '@components/molecules/skeleton-container';
import WindowsEvents from '@events/index';
import useEventListener from '@hooks/eventListenerHooks';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import EmptyBody from '@modules/cart/sections/emptyBody';
import cartSlice from '@store/cart';
import { useQuery } from '@tanstack/react-query';
import getCart, { getCartSync } from '@use-cases/cart/get-cart';
import getParamData from '@use-cases/cms/getParamData';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

interface ParsedUrlQueryForPage extends ParsedUrlQuery {
  cartId: string;
}

interface Props {
  children: React.ReactNode;
}

const CartContainerProvider = ({ children }: Props) => {
  const { addCartId, setCart, setLoading } = cartSlice.actions;
  const { query } = useRouter();
  const { cartId, cartBFF } = useAppSelector((state) => state.cart);
  const { cartId: cartQuery } = query as ParsedUrlQueryForPage;
  const dispatch = useAppDispatch();
  setLoading(false);

  const { data: cart, isLoading } = useQuery(
    ['get-cart', cartQuery],
    () => getCartSync({ cartId: cartQuery }),
    {
      enabled: Boolean(cartQuery),
    },
  );

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
    dispatch(getParamData());
  }, []);

  useEffect(() => {
    dispatch(addCartId(cartQuery));
  }, [cartQuery, dispatch, addCartId]);

  useEffect(() => {
    if (cart) dispatch(setCart(cart));
  }, [cart, dispatch, setCart]);

  if (isLoading) return <SkeletonCartPage />;

  if (!cartBFF?.items?.length) return <EmptyBody />;

  return <>{children}</>;
};

export default CartContainerProvider;
