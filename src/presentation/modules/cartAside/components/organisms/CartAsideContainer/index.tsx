/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from 'react';
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
import getCart from '@use-cases/cart/get-cart';
import updateItem from '@use-cases/cart/update-item';
import addItem from '@use-cases/cart/add-item';
import HybridationEvents from '../../../../../hybridationEvents';
import getParamData from '@use-cases/cms/getParamData';
import { CartAction } from '@entities/error/error.entity';
import { getCartFromLocalStorage } from '@utils/getCartFromLocalStorage';

const CartAsideContainer = () => {
  // hooks
  const { cartBFF, hasHybridation, cartId, isHeadless } = useAppSelector(
    (state) => state.cart,
  );
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const totalProducts = useAppSelector(selectTotalProductsInCart);
  const { addCartId, addProductInCart, simulateAddProduct, setIsHeadless } =
    cartSlice.actions;

  const handleSetIsOpen = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;
    setIsOpen(customEvent.detail?.open);
  };

  const handleAddProductEvent = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;
    dispatch(addProductInCart(customEvent.detail?.data));
    const customEventError = customEvent.detail?.data?.messagesErrors;

    if (customEventError.length) {
      const cartError = handlePayloadError(customEventError[0], CartAction.ADD);
      dispatch(setError(cartError));
    }
    setIsOpen(true);
  };

  const handleGetCartId = (event: Event) => {
    event.preventDefault();

    const customEvent = event as CustomEvent;
    dispatch(addCartId(customEvent.detail?.cartId));
  };

  const handleSimulateAddProductEvent = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;
    dispatch(simulateAddProduct(customEvent.detail?.product));
    setIsOpen(true);
  };

  const handleAddProductErrorEvent = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;
    const customEventError = customEvent.detail?.data.error;
    const cartError = handleHttpError(customEventError, CartAction.ADD);
    dispatch(setError(cartError));
  };

  // methods
  const methods = {
    initialize: () => {
      if (typeof window !== 'undefined') {
        useEventListener(
          document,
          WindowsEvents.TOGGLE_CART_ASIDE,
          handleSetIsOpen,
        );
        useEventListener(
          document,
          WindowsEvents.ADD_PRODUCT_IN_CART,
          handleAddProductEvent,
        );
        useEventListener(document, WindowsEvents.CART_ID, handleGetCartId);
        useEventListener(
          document,
          WindowsEvents.SIMULATE_ADD_PRODUCT,
          handleSimulateAddProductEvent,
        );
        useEventListener(
          document,
          WindowsEvents.ADD_PRODUCT_ERROR,
          handleAddProductErrorEvent,
        );
      }
    },
  };
  methods.initialize();

  const hybridation = useCallback(() => {
    window.addEventListener('message', (event: MessageEvent) => {
      const key = Object.keys(event?.data);
      const keyValue = () => {
        if (key?.length > 0 && key[0]) return key[0];
        else return '';
      };
      switch (keyValue()) {
        case HybridationEvents.CART_ID_VTEX:
          const cartIdVtex = event?.data?.CART_ID_VTEX;
          dispatch(addCartId(cartIdVtex));
          setIsOpen(true);
          break;
        case HybridationEvents.VTEX_PRODUCT_ADD_TO_CART:
          const { productReference, quantityValue, product } =
            event?.data?.VTEX_PRODUCT_ADD_TO_CART;

          dispatch(simulateAddProduct({ ...product, quantityValue }));

          const productInCart = getCartFromLocalStorage(cartBFF)?.items?.find(
            (item: any) => item.product.id === productReference,
          );
          if (productInCart) {
            const productIndex = getCartFromLocalStorage(
              cartBFF,
            )?.items?.findIndex(
              (item: any) => item.product.id === productReference,
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
              return;
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
            return;
          }
          break;
        default:
          break;
      }
    });
  }, [addCartId, cartBFF, cartId, dispatch, setIsOpen]);

  useEffect(() => {
    hybridation();
    return () => {
      window.removeEventListener('message', hybridation);
    };
  }, []);

  useEffect(() => {
    localStorage.removeItem('cbff');
    dispatch(getParamData());
    if (typeof window !== 'undefined') {
      const isHeadlessSessionStorage =
        sessionStorage.getItem('isHeadless') === 'true';
      dispatch(setIsHeadless(isHeadlessSessionStorage));
    }
  }, []);

  useEffect(() => {
    if (cartId) {
      const vtexorderform = localStorage.getItem('vtxorderform');
      const cartIdValue = vtexorderform || cartId || '';
      dispatch(getCart({ cartId: cartIdValue }));
    }
  }, [cartId]);

  return (
    <>
      {hasHybridation && !isHeadless ? (
        <>
          <Header setIsOpen={setIsOpen} />
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
      )}
    </>
  );
};
export default CartAsideContainer;
