import cartSlice from "@store/cart";
import { CartItemModel } from "@store/cart/types";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import ProductCard from "@modules/cartAside/components/organisms/ProductCard";
import { BodyContainer } from "./styles";

const Body = () => {
  // hooks
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // store actions
  const {
    setIncrementProductQuantity,
    setDecrementProductQuantity,
    setRemoveProductInCart,
  } = cartSlice.actions;

  // methods
  const methods = {
    handleIncrementQuantity: (item: CartItemModel) => {
      dispatch(setIncrementProductQuantity(item));
    },
    handleDecrementQuantity: (item: CartItemModel) => {
      dispatch(setDecrementProductQuantity(item));
    },
    handleRemoveFromCart: (item: CartItemModel) => {
      dispatch(setRemoveProductInCart(item));
    },
  };

  return (
    <BodyContainer>
      {cartItems?.map((item) => (
        <ProductCard
          key={item.productId}
          item={item}
          // onAddToCart={() => {}}
          onRemoveFromCart={() => {
            methods.handleRemoveFromCart(item);
          }}
          onIncrementQuantity={() => methods.handleIncrementQuantity(item)}
          onDecrementQuantity={() => methods.handleDecrementQuantity(item)}
        />
      ))}
    </BodyContainer>
  );
};

export default Body;
