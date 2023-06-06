/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { Body, CartAsideContainer, Footer, Title } from './CartAside.styles';
import useEventListener from '@/hooks/eventListenerHooks';
import { GrClose } from 'react-icons/gr';
import cartSlice from '@/store/cart';
import { CartItemCard } from '@/components/molecules/CartItemCard/CartItemCard';

const CartAside = () => {
  // hooks
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // states
  const [isOpen, setIsOpen] = useState(false);

  // constants
  const { setAddProductInCart, setRemoveProductInCart } = cartSlice.actions;

  // methods
  const methods = {
    initialize: () => {
      if (typeof window !== 'undefined') {
        useEventListener(
          document,
          'TOGGLE_CART_ASIDE',
          methods.handleSetIsOpen
        );
        useEventListener(
          document,
          'ADD_PRODUCT_IN_CART',
          methods.handleAddProductEvent
        );
        useEventListener(
          document,
          'REMOVE_PRODUCT_FROM_CART',
          methods.handleRemoveProductEvent
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
      dispatch(setAddProductInCart(customEvent.detail));
      setIsOpen(true);
    },
    handleRemoveProductEvent: (event: Event) => {
      event.preventDefault();
      const customEvent = event as CustomEvent;
      dispatch(setRemoveProductInCart(customEvent.detail));
      setIsOpen(true);
    },
  };
  methods.initialize();

  return (
    <CartAsideContainer isOpen={isOpen}>
      <Title>
        <div>
          Mi carro
          <span className='count'>({cartItems.length} productos)</span>
        </div>
        <GrClose onClick={() => setIsOpen(false)} />
      </Title>
      <Body>
        {cartItems.map((item) => (
          <CartItemCard
            key={item.productId}
            item={item}
            onAddToCart={() => {}}
            onRemoveFromCart={() => {}}
            onDeleteItem={() => {}}
          />
        ))}
      </Body>
      <Footer></Footer>
    </CartAsideContainer>
  );
};
export default CartAside;
