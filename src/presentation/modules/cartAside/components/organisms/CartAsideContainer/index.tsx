/* eslint-disable react-hooks/rules-of-hooks */
import { MouseEvent, useEffect, useState } from "react";
import { addProductInCart, selectTotalProductsInCart } from "@store/cart";
import useEventListener from "@hooks/eventListenerHooks";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import Header from "@modules/cartAside/sections/header";
import Body from "@modules/cartAside/sections/body";
import EmptyBody from "@modules/cartAside/sections/emptyBody";
import Footer from "@modules/cartAside/sections/footer";
import getCart from "@use-cases/cart/get-cart";
import { Container, Overlay } from "./styles";

const CartAsideContainer = () => {
  // hooks
  const dispatch = useAppDispatch();
  const totalProducts = useAppSelector(selectTotalProductsInCart);

  // states
  const [isOpen, setIsOpen] = useState(false);

  // methods
  const methods = {
    initialize: () => {
      if (typeof window !== "undefined") {
        useEventListener(
          document,
          "TOGGLE_CART_ASIDE",
          methods.handleSetIsOpen
        );
        useEventListener(
          document,
          "ADD_PRODUCT_IN_CART",
          methods.handleAddProductEvent
        );
        // useEventListener(
        //   document,
        //   "REMOVE_PRODUCT_FROM_CART",
        //   methods.handleRemoveProductEvent
        // );
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
      dispatch(addProductInCart(customEvent.detail));
      setIsOpen(true);
    },
    // handleRemoveProductEvent: (event: Event) => {
    //   event.preventDefault();
    //   const customEvent = event as CustomEvent;
    //   dispatch(removeProductInCart(customEvent.detail));
    //   setIsOpen(true);
    // },
    handleCloseOverlay: (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        setIsOpen(false);
      }
    },
  };
  methods.initialize();

  useEffect(() => {
    // TODO: remove cartId when exists endpoint to get orderFormId (from create new cart or something else)
    const cartId = "77537c78393a4bef97f0f54332afe9f0";
    dispatch(getCart({ cartId }));
  }, [dispatch]);

  return (
    <Overlay isOpen={isOpen} onClick={methods.handleCloseOverlay}>
      <Container isOpen={isOpen}>
        <Header setIsOpen={setIsOpen} />
        {totalProducts > 0 ? (
          <>
            <Body />
            <Footer />
          </>
        ) : (
          <EmptyBody />
        )}
      </Container>
    </Overlay>
  );
};
export default CartAsideContainer;
