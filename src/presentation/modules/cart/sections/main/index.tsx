import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProductInCart,
  selectCart,
  selectTotalProductsInCart,
} from "@store/cart";
import ProductCard from "@modules/cart/components/organisms/ProductCard";
import { Item } from "@entities/cart/cart.entity";
import { Container, TotalProductsContainer } from "./styles";

const Main = () => {
  // hooks
  const { cartBFF } = useAppSelector(selectCart);
  const totalProducts = useAppSelector(selectTotalProductsInCart);
  const dispatch = useAppDispatch();

  // methods
  const methods = {
    handleIncrementQuantity: (item: Item, index: number) => {
      // TODO: update with new endpoint
      // dispatch(incrementProductQuantity(item));
    },
    handleDecrementQuantity: (item: Item, index: number) => {
      // TODO: update with new endpoint
      // dispatch(decrementProductQuantity(item));
    },
    handleRemoveFromCart: (item: Item) => {
      // TODO: update with new endpoint
      // dispatch(removeProductInCart(item));
    },
  };

  return (
    <Container>
      <TotalProductsContainer>
        Tu compra {`{${totalProducts}}`}
      </TotalProductsContainer>
      {cartBFF?.items?.map((item: Item, index: number) => (
        <ProductCard
          key={item?.itemId}
          item={item}
          onRemoveFromCart={() => {
            methods.handleRemoveFromCart(item);
          }}
          onIncrementQuantity={() =>
            methods.handleIncrementQuantity(item, index)
          }
          onDecrementQuantity={() =>
            methods.handleDecrementQuantity(item, index)
          }
        />
      ))}
    </Container>
  );
};

export default Main;
