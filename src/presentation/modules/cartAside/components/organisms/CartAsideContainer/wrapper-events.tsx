import { Cart } from '@entities/cart/cart.entity';
import { CartAction } from '@entities/error/error.entity';
import WindowsEvents from '@events/index';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import cartSlice from '@store/cart';
import { setError } from '@store/error';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import getCart from '@use-cases/cart/get-cart';
import handleHttpError from '@use-cases/error/handle-http-errors';
import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const WrapperEvents: React.FC<Props> = ({ children }) => {
  const {
    addCartId,
    addProductInCart,
    simulateAddProductHeadless,
    simulateRemoveProduct,
    setCartAsideIsOpen,
    setCart,
  } = cartSlice.actions;

  const dispatch = useAppDispatch();
  const { cartId, cartBFF } = useAppSelector((state) => state.cart);

  const handleSetIsOpen = useCallback(
    (event: Event) => {
      event.stopImmediatePropagation();
      const customEvent = event as CustomEvent;
      dispatch(setCartAsideIsOpen(customEvent.detail?.open));
    },
    [dispatch, setCartAsideIsOpen],
  );

  const handleGetCartId = useCallback(
    (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent<{ cartId: string }>;
      const {
        detail: { cartId },
      } = customEvent;
      dispatch(addCartId(cartId));
    },
    [addCartId, dispatch],
  );

  const handleSimulateAddProductEvent = useCallback(
    (event: Event) => {
      event.stopImmediatePropagation();
      const customEvent = event as CustomEvent;
      dispatch(simulateAddProductHeadless(customEvent.detail?.product));
      dispatch(setCartAsideIsOpen(true));
    },
    [dispatch, setCartAsideIsOpen, simulateAddProductHeadless],
  );

  const handleGetShoppingCart = useCallback(
    (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent<{ shoppingCart: Cart }>;
      const {
        detail: { shoppingCart },
      } = customEvent;

      if (_.isEqual(cartBFF, shoppingCart) || !cartId) return;

      dispatch(getCart({ cartId }));
      // dispatch(addProductInCart(shoppingCart));
    },
    [dispatch, cartId, cartBFF],
  );

  const handleAddProductErrorEvent = useCallback(
    (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent;
      const customEventError = customEvent.detail?.data.error;
      const cartError = handleHttpError(customEventError, CartAction.ADD);
      dispatch(setError(cartError));
      setTimeout(() => {
        dispatch(simulateRemoveProduct(customEvent.detail?.data?.itemId));
      }, 4000);
    },
    [dispatch, simulateRemoveProduct],
  );

  const handleAddProductEvent = useCallback(
    (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent;

      dispatch(addProductInCart(customEvent.detail?.data));

      dispatch(setCartAsideIsOpen(true));
    },
    [addProductInCart, dispatch, setCartAsideIsOpen],
  );

  useEffect(() => {
    document.addEventListener(WindowsEvents.TOGGLE_CART_ASIDE, handleSetIsOpen);
    window.addEventListener(
      WindowsEvents.SIMULATE_ADD_PRODUCT,
      handleSimulateAddProductEvent,
    );

    window.addEventListener(WindowsEvents.GET_CART_ID, handleGetCartId);
    window.addEventListener(
      WindowsEvents.GET_SHOPPING_CART,
      handleGetShoppingCart,
    );
    window.addEventListener(
      WindowsEvents.ADD_PRODUCT_ERROR,
      handleAddProductErrorEvent,
    );
    window.addEventListener(
      WindowsEvents.ADD_PRODUCT_IN_CART,
      handleAddProductEvent,
    );

    return () => {
      document.removeEventListener(
        WindowsEvents.SIMULATE_ADD_PRODUCT,
        handleSimulateAddProductEvent,
      );

      window.removeEventListener(WindowsEvents.GET_CART_ID, handleGetCartId);
      window.removeEventListener(
        WindowsEvents.GET_SHOPPING_CART,
        handleGetShoppingCart,
      );

      window.removeEventListener(
        WindowsEvents.ADD_PRODUCT_ERROR,
        handleAddProductErrorEvent,
      );
      window.removeEventListener(
        WindowsEvents.ADD_PRODUCT_IN_CART,
        handleAddProductEvent,
      );
    };
  }, [
    handleSimulateAddProductEvent,
    handleGetCartId,
    handleAddProductEvent,
    handleAddProductErrorEvent,
    handleGetShoppingCart,
    handleSetIsOpen,
  ]);

  useEffect(() => {
    if (!cartId) {
      customDispatchEvent({
        name: WindowsEvents.DISPATCH_GET_CART_ID,
        detail: {},
      });
    }
  }, [cartId]);

  useEffect(() => {
    if (!cartBFF) {
      customDispatchEvent({
        name: WindowsEvents.DISPATCH_GET_CART,
        detail: {},
      });
    }
  }, [cartBFF]);

  return <>{children}</>;
};

export default WrapperEvents;
