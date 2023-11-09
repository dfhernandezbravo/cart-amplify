/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
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
import getParamData from '@use-cases/cms/getParamData';

const CartAsideContainer = () => {
  // hooks
  const { cartBFF, hasHybridation, cartAsideIsOpen, cartId } = useAppSelector(
    (state) => state.cart,
  );
  const dispatch = useAppDispatch();
  const totalProducts = useMemo(
    () => totalProductInCart(cartBFF as Cart),
    [cartBFF],
  );
  const [newCartId, setNewCartId] = useState(null);

  const {
    addCartId,
    addProductInCart,
    simulateAddProduct,
    simulateRemoveProduct,
    setCartAsideIsOpen,
    resetCartBFF,
  } = cartSlice.actions;

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
  };
  methods.initialize();

  const verifyOrderformId = useCallback(() => {
    console.log('newCartId ', newCartId);
    if (newCartId) return newCartId;
    if (cartId && cartId?.length > 0) return cartId;
  }, [newCartId, cartId]);

  const handleHybridationMessages = useCallback(
    (event: MessageEvent) => {
      const key = Object.keys(event?.data);

      if (key?.length > 0 && key[0] === HybridationEvents.CART_ID_VTEX) {
        const cartIdVtex = event?.data?.CART_ID_VTEX;
        setNewCartId(cartIdVtex);
        console.log('Message CART_ID_VTEX ', cartIdVtex);
        console.log('cartId ', cartId);

        const hasUpdatedCartId = cartId !== cartIdVtex;
        console.log('hasUpdatedCartId ', hasUpdatedCartId);

        if (hasUpdatedCartId) {
          // Resetear cartBFF o llamará información de antiguo cartId
          console.log('antes de resetCartBFF');
          dispatch(resetCartBFF());
          dispatch(addCartId(cartIdVtex));
          // dispatch(getCart({ cartId: cartIdVtex }));
          dispatch(setCartAsideIsOpen(true));
        }
      }

      if (
        key?.length > 0 &&
        key[0] === HybridationEvents.VTEX_PRODUCT_ADD_TO_CART
      ) {
        const { productReference, quantityValue, product } =
          event?.data?.VTEX_PRODUCT_ADD_TO_CART;

        dispatch(simulateAddProduct({ ...product, quantityValue }));

        console.log('before add cartBFF, cartId ', {
          cartBFF,
          cartId,
        });

        const productInCart = cartBFF?.items?.find(
          (item) => item.product.id === productReference,
        );

        if (productInCart) {
          const productIndex = cartBFF?.items?.findIndex(
            (item) => item.product.id === productReference,
          );

          if (productIndex !== undefined && productIndex !== -1) {
            console.log('before updateItem ', cartId);

            verifyOrderformId() &&
              dispatch(
                updateItem({
                  cartId: verifyOrderformId() ?? '',
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
          console.log('before addItem ', cartId);
          verifyOrderformId() &&
            dispatch(
              addItem({
                cartId: verifyOrderformId() ?? '',
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
    [cartBFF, cartId, hasHybridation, addCartId, newCartId],
  );

  useEffect(() => {
    window.addEventListener('message', handleHybridationMessages);
    return () => {
      window.removeEventListener('message', handleHybridationMessages);
    };
    // }, [cartBFF, cartId, hasHybridation]);
  }, []);

  useEffect(() => {
    dispatch(getParamData());
  }, []);

  useEffect(() => {
    if (verifyOrderformId()) {
      dispatch(getCart({ cartId: verifyOrderformId() ?? '' }));
    }
  }, [verifyOrderformId()]);

  useEffect(() => {
    console.log('inside useEffect before getCart ', {
      cartId,
      newCartId,
    });
    if (cartId?.length > 0 && cartId === newCartId) {
      console.log('inside if getCart');
      dispatch(getCart({ cartId }));
    }
  }, [cartId, newCartId]);

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
