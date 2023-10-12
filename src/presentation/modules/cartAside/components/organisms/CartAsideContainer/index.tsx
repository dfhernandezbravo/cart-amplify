/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, useMemo, useState } from 'react';
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

const CartAsideContainer = () => {
  // hooks
  const { cartBFF } = useAppSelector((state) => state.cart);
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
  } = cartSlice.actions;

  // states
  const [isOpen, setIsOpen] = useState(true);

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
      setIsOpen(customEvent.detail?.open);
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
      setIsOpen(true);
    },
    handleCloseOverlay: (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        setIsOpen(false);
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
      setIsOpen(true);
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

  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      transitionDuration={300}
      PaperProps={{
        sx: {
          minWidth: '280px',
          width: '90%',
          maxWidth: '400px',
        },
      }}
    >
      <Header setIsOpen={setIsOpen} />
      {totalProducts > 0 ? (
        <>
          <Body />
          <Footer />
        </>
      ) : (
        <EmptyBody />
      )}
    </SwipeableDrawer>
  );
};
export default CartAsideContainer;
