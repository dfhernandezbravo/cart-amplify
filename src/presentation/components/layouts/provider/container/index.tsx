import SkeletonCartPage from '@components/molecules/skeleton-container';
import WindowsEvents from '@events/index';
import useEventListener from '@hooks/eventListenerHooks';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import EmptyBody from '@modules/cart/sections/emptyBody';
import cartSlice, { quantitySelected } from '@store/cart';
import { useQuery } from '@tanstack/react-query';
import getCart, { getCartSync } from '@use-cases/cart/get-cart';
import observability from '@use-cases/cart/obsevability';
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

type OrderTrace = {
  orderId: string;
  amount: number;
};

const CartContainerProvider = ({ children }: Props) => {
  const { addCartId, setCart, setLoading, setParams, setQuantitySelected } =
    cartSlice.actions;
  const { query } = useRouter();
  const { cartId, cartBFF } = useAppSelector((state) => state.cart);
  const { cartId: cartQuery } = query as ParsedUrlQueryForPage;
  const dispatch = useAppDispatch();

  const { data: cart, isLoading } = useQuery(
    ['get-cart', cartQuery],
    () => getCartSync({ cartId: cartQuery }),
    {
      enabled: !!cartQuery,
      cacheTime: 0,
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

  const { data } = useQuery(['get-params'], () => getParamData(), {
    cacheTime: 0.5 * 60 * 1000,
  });

  if (data) {
    dispatch(
      setParams({
        isEnabledMiniCart: data?.params?.hybridation?.isEnabledMiniCart,
        isCencopayActive: data?.params?.isCencopayActive,
        isEnabledCheckoutV1: data?.params?.isEnabledCheckoutV1,
      }),
    );
  }

  useEffect(() => {
    (async () => {
      const localStorageOrderTrace = localStorage.getItem('orderTrace');
      const orderTrace: OrderTrace =
        localStorageOrderTrace && JSON.parse(localStorageOrderTrace);
      if (
        (orderTrace && orderTrace.orderId !== cartBFF?.id) ||
        (orderTrace && +orderTrace.amount !== cartBFF?.totals?.totalPrice) ||
        !localStorageOrderTrace
      ) {
        const totalAmount = cartBFF?.totals?.totalPrice as number;
        const cartId = cartBFF?.id as string;
        const infoTrace = {
          eventName: 'cart',
          data: {
            orderId: cartId,
            totalAmount: totalAmount,
          },
        };
        await observability(infoTrace);
        localStorage.setItem(
          'orderTrace',
          JSON.stringify({ orderId: cartId, amount: totalAmount }),
        );
      }
    })();
  }, [cartBFF]);

  useEffect(() => {
    dispatch(setLoading(false));
    dispatch(setQuantitySelected(quantitySelected));
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
