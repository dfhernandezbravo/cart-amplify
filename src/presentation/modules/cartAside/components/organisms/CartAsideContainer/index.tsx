/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import { selectTotalProductsInCart } from '@store/cart';
import cartSlice from '@store/cart';
import { setError } from '@store/error';
import useEventListener from '@hooks/eventListenerHooks';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import Header from '@modules/cartAside/sections/header';
import Body from '@modules/cartAside/sections/body';
import EmptyBody from '@modules/cartAside/sections/emptyBody';
import Footer from '@modules/cartAside/sections/footer';
import WindowsEvents from '@events/index';
import handleHttpError from '@use-cases/error/handle-http-errors';
import handlePayloadError from '@use-cases/error/handle-payload-errors';

import { Cart } from '@entities/cart/cart.entity';
import totalProductInCart from '@utils/totalProduct';
import getCart from '@use-cases/cart/get-cart';
import updateItem from '@use-cases/cart/update-item';
import addItem from '@use-cases/cart/add-item';
import HybridationEvents from '../../../../../hybridationEvents';

const CartAsideContainer = () => {
  // hooks
  const { cartBFF, hybridation, cartAsideIsOpen, cartId } = useAppSelector(
    (state) => state.cart,
  );
  const dispatch = useAppDispatch();
  const totalProducts = useMemo(
    () => totalProductInCart(cartBFF as Cart),
    [cartBFF],
  );

  const {
    addCartId,
    addProductInCart,
    simulateAddProduct,
    simulateRemoveProduct,
    setCartAsideIsOpen,
    setHybridation,
  } = cartSlice.actions;

  const { cartIdHybridation, hasHybridation } = hybridation;

  // methods
  const methods = {
    initialize: () => {
      if (typeof window !== 'undefined') {
        useEventListener(
          document,
          WindowsEvents.TOGGLE_CART_ASIDE,
          methods.handleSetIsOpen,
        );
        useEventListener(
          document,
          WindowsEvents.ADD_PRODUCT_IN_CART,
          methods.handleAddProductEvent,
        );
        useEventListener(
          document,
          WindowsEvents.CART_ID,
          methods.handleGetCartId,
        );
        useEventListener(
          document,
          WindowsEvents.SIMULATE_ADD_PRODUCT,
          methods.handleSimulateAddProductEvent,
        );
        useEventListener(
          document,
          WindowsEvents.ADD_PRODUCT_ERROR,
          methods.handleAddProductErrorEvent,
        );
      }
    },
    handleSetIsOpen: (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent;
      dispatch(setCartAsideIsOpen(customEvent.detail?.open));
    },
    handleAddProductEvent: (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent;
      dispatch(addProductInCart(customEvent.detail?.data));
      const customEventError = customEvent.detail?.data?.messagesErrors;

      if (customEventError.length) {
        const cartError = handlePayloadError(customEventError[0]);
        dispatch(setError(cartError));
      }
      dispatch(setCartAsideIsOpen(true));
    },
    handleCloseOverlay: (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        dispatch(setCartAsideIsOpen(false));
      }
    },
    handleGetCartId: (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent;
      dispatch(addCartId(customEvent.detail?.cartId));
    },
    handleSimulateAddProductEvent: (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent;
      dispatch(simulateAddProduct(customEvent.detail?.product));
      dispatch(setCartAsideIsOpen(true));
    },
    handleAddProductErrorEvent: (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent;
      const customEventError = customEvent.detail?.data.error;
      const cartError = handleHttpError(customEventError);
      dispatch(setError(cartError));

      // wait 4sec before remove product
      setTimeout(() => {
        dispatch(simulateRemoveProduct(customEvent.detail?.data.itemId));
      }, 4000);
    },
    handleHybridationMessages: (event: MessageEvent) => {
      const key = Object.keys(event?.data);

      if (key?.length > 0 && key[0] === HybridationEvents.HYBRIDATION) {
        const { cartId: cartIdHybridation, isEnabledMiniCart } = JSON.parse(
          event?.data?.HYBRIDATION,
        );
        dispatch(
          setHybridation({
            cartIdHybridation,
            hasHybridation: isEnabledMiniCart,
          }),
        );
      }

      if (key?.length > 0 && key[0] === HybridationEvents.MINICART_OPEN) {
        dispatch(setCartAsideIsOpen(event?.data?.MINICART_OPEN));
      }

      if (
        key?.length > 0 &&
        key[0] === HybridationEvents.VTEX_PRODUCT_ADD_TO_CART
      ) {
        const { productReference, quantityValue } =
          event?.data?.VTEX_PRODUCT_ADD_TO_CART;

        const productInCart = cartBFF?.items?.find(
          (item) => item.product.id === productReference,
        );

        if (productInCart) {
          const productIndex = cartBFF?.items?.findIndex(
            (item) => item.product.id === productReference,
          );

          if (productIndex !== undefined && productIndex !== -1) {
            dispatch(
              updateItem({
                cartId,
                items: [
                  {
                    index: productIndex,
                    quantity: quantityValue
                      ? productInCart.quantity + parseInt(quantityValue)
                      : productInCart.quantity + 1,
                  },
                ],
              }),
            );
          }
        } else {
          dispatch(
            addItem({
              cartId,
              items: [
                {
                  quantity: quantityValue ? parseInt(quantityValue) : 1,
                  id: productReference,
                },
              ],
            }),
          );
        }
      }
    },
  };
  methods.initialize();

  useEffect(() => {
    if (hasHybridation) {
      dispatch(addCartId(cartIdHybridation));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', methods.handleHybridationMessages);
    return () => {
      window.removeEventListener('message', methods.handleHybridationMessages);
    };
  }, [window, methods.handleHybridationMessages]);

  useEffect(() => {
    if (cartId) {
      dispatch(getCart({ cartId }));
    }
  }, [cartId]);

  return (
    <>
      {hasHybridation ? (
        <>
          <Header />
          {totalProducts > 0 ? (
            <>
              <Body />
              <Footer />
            </>
          ) : (
            <EmptyBody />
          )}
        </>
      ) : (
        <SwipeableDrawer
          anchor="right"
          open={cartAsideIsOpen}
          onClose={() => dispatch(setCartAsideIsOpen(false))}
          onOpen={() => dispatch(setCartAsideIsOpen(true))}
          transitionDuration={300}
          PaperProps={{
            sx: {
              minWidth: '280px',
              width: '90%',
              maxWidth: '400px',
            },
          }}
        >
          <Header />
          {totalProducts > 0 ? (
            <>
              <Body />
              <Footer />
            </>
          ) : (
            <EmptyBody />
          )}
        </SwipeableDrawer>
      )}
    </>
  );
};
export default CartAsideContainer;
