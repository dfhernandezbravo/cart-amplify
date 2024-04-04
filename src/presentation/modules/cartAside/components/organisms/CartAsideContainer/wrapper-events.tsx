import { Cart } from '@entities/cart/cart.entity';
import { CartAction } from '@entities/error/error.entity';
import WindowsEvents from '@events/index';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import cartSlice from '@store/cart';
import { setError } from '@store/error';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import getCart from '@use-cases/cart/get-cart';
import handleHttpError from '@use-cases/error/handle-http-errors';
import handlePayloadError from '@use-cases/error/handle-payload-errors';
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
    setSelectedQuantityMinicart,
    resetSelectedQuantityMinicart,
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

      dispatch(resetSelectedQuantityMinicart());
      const messagesError = shoppingCart.messagesErrors;

      if (messagesError?.length) {
        const cartError = handlePayloadError(messagesError, 'MINICART');

        if (cartError) {
          if (cartError?.ean) {
            const productIndex = cartBFF?.items.findIndex(
              (item) => item.product.ean === cartError.ean,
            );

            if (
              productIndex !== undefined &&
              productIndex !== -1 &&
              cartBFF?.items[productIndex]?.quantity
            ) {
              dispatch(
                setSelectedQuantityMinicart({
                  quantity: cartBFF.items[productIndex].quantity,
                  index: productIndex,
                }),
              );
            }
          }
          dispatch(setError(cartError));
        }
      }

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
      const customEventError = customEvent.detail?.error;

      if (customEventError) {
        const cartError = handleHttpError(
          customEventError,
          CartAction.ADD,
          'MINICART',
        );
        if (cartError) {
          dispatch(setError(cartError));
          setTimeout(() => {
            customDispatchEvent({
              name: WindowsEvents.DISPATCH_GET_CART,
              detail: { origin: 'CART' },
            });
          }, 4000);
        }
      }
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
      WindowsEvents.UPDATE_MINI_CART,
      handleGetShoppingCart,
    );
    window.addEventListener(
      WindowsEvents.GET_SHOPPING_CART_ERROR,
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
        WindowsEvents.UPDATE_MINI_CART,
        handleGetShoppingCart,
      );

      window.removeEventListener(
        WindowsEvents.GET_SHOPPING_CART_ERROR,
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
        detail: { origin: 'CART' },
      });
    }
  }, [cartId]);

  useEffect(() => {
    if (!cartBFF) {
      customDispatchEvent({
        name: WindowsEvents.DISPATCH_GET_CART,
        detail: { origin: 'CART' },
      });
    }
  }, [cartBFF]);

  return <>{children}</>;
};

export default WrapperEvents;
