/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, useCallback, useEffect } from 'react';
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
import { useRouter } from 'next/router';
import { Container } from './styles';

const CartAsideContainer = () => {
  // hooks
  const { cartBFF, hasHybridation, cartAsideIsOpen, cartId } = useAppSelector(
    (state) => state.cart,
  );
  const dispatch = useAppDispatch();
  // const totalProducts = useMemo(
  //   () => totalProductInCart(cartBFF as Cart),
  //   [cartBFF],
  // );

  const totalProducts = useAppSelector(selectTotalProductsInCart);
  const {
    addCartId,
    addProductInCart,
    simulateAddProduct,
    simulateRemoveProduct,
    setCartAsideIsOpen,
  } = cartSlice.actions;

  const handleSetIsOpen = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;
    dispatch(setCartAsideIsOpen(customEvent.detail?.open));
  };

  const handleAddProductEvent = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;
    dispatch(addProductInCart(customEvent.detail?.data));
    const customEventError = customEvent.detail?.data?.messagesErrors;

    if (customEventError.length) {
      const cartError = handlePayloadError(customEventError[0]);
      dispatch(setError(cartError));
    }
    dispatch(setCartAsideIsOpen(true));
  };

  const handleCloseOverlay = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      dispatch(setCartAsideIsOpen(false));
    }
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
    dispatch(setCartAsideIsOpen(true));
  };

  const handleAddProductErrorEvent = (event: Event) => {
    event.preventDefault();
    const customEvent = event as CustomEvent;
    const customEventError = customEvent.detail?.data.error;
    const cartError = handleHttpError(customEventError);
    dispatch(setError(cartError));

    // wait 4sec before remove product
    setTimeout(() => {
      dispatch(simulateRemoveProduct(customEvent.detail?.data.itemId));
    }, 4000);
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

  const getCartFromLS = () => {
    const cartLS = localStorage.getItem('cbff');
    if (cartLS && cartLS !== 'undefined') {
      return JSON.parse(cartLS);
    } else {
      return cartBFF;
    }
  };

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
          dispatch(setCartAsideIsOpen(true));
          break;
        case HybridationEvents.VTEX_PRODUCT_ADD_TO_CART:
          const { productReference, quantityValue, product } =
            event?.data?.VTEX_PRODUCT_ADD_TO_CART;

          dispatch(simulateAddProduct({ ...product, quantityValue }));

          const productInCart = getCartFromLS()?.items?.find(
            (item: any) => item.product.id === productReference,
          );
          if (productInCart) {
            const productIndex = getCartFromLS()?.items?.findIndex(
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
              //dispatch(getCart({ cartId }));
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
            //dispatch(getCart({ cartId }));
            return;
          }
          break;
        default:
          break;
      }
    });
  }, [addCartId, cartBFF, cartId, dispatch, setCartAsideIsOpen]);

  useEffect(() => {
    hybridation();
    return () => {
      window.removeEventListener('message', hybridation);
    };
  }, []);

  useEffect(() => {
    localStorage.removeItem('cbff');
    dispatch(getParamData());
  }, []);

  useEffect(() => {
    if (cartId) {
      const vtexorderform = localStorage.getItem('vtxorderform');
      const cartIdValue = cartId || vtexorderform || '';
      dispatch(getCart({ cartId: cartIdValue }));
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
            <Container>
              <Body />
              <Footer />
            </Container>
          ) : (
            <EmptyBody />
          )}
        </SwipeableDrawer>
      )}
    </>
  );
};
export default CartAsideContainer;
