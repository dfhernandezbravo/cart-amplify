import { CgShoppingCart } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductInCart,
  selectCart,
  selectTotalProductsInCart,
} from "@store/cart";
import ProductCard from "@modules/cart/components/organisms/ProductCard";
import { Container, TotalProductsContainer } from "./styles";
import { CartItemModel } from "@store/cart/types";

const Main = () => {
  // hooks
  const { cartItems } = useAppSelector(selectCart);
  const totalProducts = useAppSelector(selectTotalProductsInCart);
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
    <Container>
      <TotalProductsContainer>
        <CgShoppingCart size={24} />
        Tu carro de compras <span>({totalProducts} productos)</span>
      </TotalProductsContainer>
      {cartItems?.map((item) => (
        <ProductCard
          key={item.productId}
          item={item}
          onRemoveFromCart={() => {
            methods.handleRemoveFromCart(item);
          }}
          onIncrementQuantity={() => methods.handleIncrementQuantity(item)}
          onDecrementQuantity={() => methods.handleDecrementQuantity(item)}
        />
      ))}
    </Container>
  );
};

export default Main;
