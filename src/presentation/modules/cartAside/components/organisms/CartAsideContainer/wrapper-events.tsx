import { Cart } from '@entities/cart/cart.entity';
import { CartAction } from '@entities/error/error.entity';
import WindowsEvents from '@events/index';
import { useAppDispatch } from '@hooks/storeHooks';
import cartSlice from '@store/cart';
import { setError } from '@store/error';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import handleHttpError from '@use-cases/error/handle-http-errors';
import React, { useEffect } from 'react';

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

  const handleSetIsOpen = (event: Event) => {
    event.stopImmediatePropagation();
    const customEvent = event as CustomEvent;
    dispatch(setCartAsideIsOpen(customEvent.detail?.open));
  };

  const handleGetCartId = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent<{ cartId: string }>;
    const {
      detail: { cartId },
    } = customEvent;
    dispatch(addCartId(cartId));
  };

  const handleSimulateAddProductEvent = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;
    dispatch(simulateAddProductHeadless(customEvent.detail?.product));
    dispatch(setCartAsideIsOpen(true));
  };

  const handleGetShoppingCart = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent<{ shoppingCart: Cart }>;
    const {
      detail: { shoppingCart },
    } = customEvent;
    dispatch(setCart(shoppingCart));
  };

  const handleAddProductErrorEvent = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;
    const customEventError = customEvent.detail?.data.error;
    const cartError = handleHttpError(customEventError, CartAction.ADD);
    dispatch(setError(cartError));
    setTimeout(() => {
      dispatch(simulateRemoveProduct(customEvent.detail?.data?.itemId));
    }, 4000);
  };

  const handleAddProductEvent = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;

    dispatch(addProductInCart(customEvent.detail?.data));
    // const customEventError = customEvent.detail?.data?.messagesErrors;

    // if (customEventError.length) {
    //   const cartError = handlePayloadError(customEventError[0], CartAction.ADD);
    //   dispatch(setError(cartError));
    // }
    dispatch(setCartAsideIsOpen(true));
  };

  useEffect(() => {
    document.addEventListener(WindowsEvents.TOGGLE_CART_ASIDE, handleSetIsOpen);
    window.addEventListener(
      WindowsEvents.SIMULATE_ADD_PRODUCT,
      handleSimulateAddProductEvent,
    );

    window.addEventListener(WindowsEvents.GET_CART_ID, handleGetCartId);
    window.addEventListener('GET_SHOPPING_CART', handleGetShoppingCart);
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
      window.removeEventListener('GET_SHOPPING_CART', handleGetShoppingCart);

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
  ]);

  useEffect(() => {
    customDispatchEvent({
      name: WindowsEvents.DISPATCH_GET_CART_ID,
      detail: {},
    });
    customDispatchEvent({
      name: WindowsEvents.DISPATCH_GET_CART,
      detail: {},
    });
  }, []);

  return <>{children}</>;
};

export default WrapperEvents;
