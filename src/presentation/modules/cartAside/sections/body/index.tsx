import {
  selectCart,
  removeProductInCart,
  incrementProductQuantity,
  decrementProductQuantity,
} from "@store/cart";
import { CartItemModel } from "@store/cart/types";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import ProductCard from "@modules/cartAside/components/organisms/ProductCard";
import { BodyContainer } from "./styles";

const Body = () => {
  // hooks
  const { cartItems } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  // methods
  const methods = {
    handleIncrementQuantity: (item: CartItemModel) => {
      dispatch(incrementProductQuantity(item));
    },
    handleDecrementQuantity: (item: CartItemModel) => {
      dispatch(decrementProductQuantity(item));
    },
    handleRemoveFromCart: (item: CartItemModel) => {
      dispatch(removeProductInCart(item));
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
