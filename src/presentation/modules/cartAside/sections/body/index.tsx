import { selectCart } from "@store/cart";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import ProductCard from "@modules/cartAside/components/organisms/ProductCard";
import { Item } from "@entities/cart/cart.entity";
import updateItem from "@use-cases/cart/update-item";
import deleteItem from "@use-cases/cart/delete-item";
import { BodyContainer } from "./styles";

const Body = () => {
  // hooks
  const { cartId, cartBFF } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  // methods
  const methods = {
    handleIncrementQuantity: (item: Item, index: number) => {
      const quantity = item.quantity ?? 0;
      dispatch(
        updateItem({
          cartId: cartId ?? "",
          items: [{ quantity: quantity + 1, index: index }],
        })
      );
    },
    handleDecrementQuantity: (item: Item, index: number) => {
      const quantity = item.quantity ?? 0;
      dispatch(
        updateItem({
          cartId: cartId ?? "",
          items: [{ quantity: quantity - 1, index: index }],
        })
      );
    },
    handleRemoveFromCart: (index: number) => {
      dispatch(deleteItem({ cartId: cartId ?? "", itemIndex: index }));
    },
  };

  return (
    <BodyContainer>
      {cartBFF?.items?.map((item: Item, index: number) => (
        <ProductCard
          key={item.itemId}
          item={item}
          index={index}
          onRemoveFromCart={() => {
            methods.handleRemoveFromCart(index);
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
