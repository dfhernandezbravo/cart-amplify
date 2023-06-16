/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { addProductInCart, selectTotalProductsInCart } from "@store/cart";
import useEventListener from "@hooks/eventListenerHooks";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import Header from "@modules/cartAside/sections/header";
import Body from "@modules/cartAside/sections/body";
import Footer from "@modules/cartAside/sections/footer";

import { CartAsideContainer } from "./styles";
import EmptyBody from "@modules/cartAside/sections/emptyBody";

const CartContainer = () => {
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
  };
  methods.initialize();

  return (
    <CartAsideContainer isOpen={isOpen}>
      <Header setIsOpen={setIsOpen} />
      {totalProducts > 0 ? (
        <>
          <Body />
          <Footer />
        </>
      ) : (
        <EmptyBody />
      )}
    </CartAsideContainer>
  );
};
export default CartContainer;
