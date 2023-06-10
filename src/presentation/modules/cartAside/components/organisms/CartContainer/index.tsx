/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import cartSlice from "@store/cart";
import useEventListener from "@hooks/eventListenerHooks";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import Header from "@modules/cartAside/sections/header";
import Body from "@modules/cartAside/sections/body";
import Footer from "@modules/cartAside/sections/footer";

import { CartAsideContainer } from "./styles";

const CartContainer = () => {
  // hooks
  const dispatch = useAppDispatch();

  // states
  const [isOpen, setIsOpen] = useState(false);

  // store actions
  const { setAddProductInCart } = cartSlice.actions;

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
      dispatch(setAddProductInCart(customEvent.detail));
      setIsOpen(true);
    },
    // handleRemoveProductEvent: (event: Event) => {
    //   event.preventDefault();
    //   const customEvent = event as CustomEvent;
    //   dispatch(setRemoveProductInCart(customEvent.detail));
    //   setIsOpen(true);
    // },
  };
  methods.initialize();

  return (
    <CartAsideContainer isOpen={isOpen}>
      <Header setIsOpen={setIsOpen} />
      <Body />
      <Footer />
    </CartAsideContainer>
  );
};
export default CartContainer;
