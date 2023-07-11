import { selectCart } from "@store/cart";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import ProductCard from "@modules/cartAside/components/organisms/ProductCard";
import { Item } from "@entities/cart/cart.entity";
import updateItem from "@use-cases/cart/update-item";
import { BodyContainer } from "./styles";

const Body = () => {
  // hooks
  const { cartItems, cartBFF } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  // methods
  const methods = {
    handleIncrementQuantity: (item: Item, index: number) => {
      const quantity = item.quantity ?? 0;
      dispatch(
        updateItem({
          cartId: cartBFF?.id ?? "",
          items: [{ quantity: quantity + 1, index: index }],
        })
      );
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
    <BodyContainer>
      {cartBFF?.items?.map((item: Item, index: number) => (
        <ProductCard
          key={item.itemId}
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
    </BodyContainer>
  );
};

export default Body;
