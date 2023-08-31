import { useCallback } from "react";
import _ from "lodash";
import {
  decrementProductQuantity,
  incrementProductQuantity,
  removeProduct,
  selectCart,
} from "@store/cart";
import { selectError } from "@store/error";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import ProductCard from "@modules/cartAside/components/organisms/ProductCard";
import MinicartError from "@modules/cart/components/molecules/MinicartError";
import { Item } from "@entities/cart/cart.entity";
import updateItem from "@use-cases/cart/update-item";
import deleteItem from "@use-cases/cart/delete-item";
import { AvailableProductText, BodyContainer } from "./styles";
import ProductCardWithouthStock from "@modules/cartAside/components/organisms/ProductCardWithoutStock";


const withoutStock = 'withoutStock'

const Body = () => {
  // Hooks
  const { cartId, cartBFF } = useAppSelector(selectCart);
  const { error } = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  // Methods
  const methods = {
    handleIncrementQuantity: useCallback(
      _.debounce((item: Item, index: number) => {
        const quantity = item.quantity ?? 0;
        dispatch(
          updateItem({
            cartId: cartId ?? "",
            items: [{ quantity: quantity + 1, index: index }],
          })
        );
      }, 500),
      []
    ),
    handleDecrementQuantity: useCallback(
      _.debounce((item: Item, index: number) => {
        const quantity = item.quantity ?? 0;
        dispatch(
          updateItem({
            cartId: cartId ?? "",
            items: [{ quantity: quantity - 1, index: index }],
          })
        );
      }, 500),
      []
    ),
    handleRemoveFromCart: (index: number) => {
      dispatch(removeProduct(index));
      dispatch(deleteItem({ cartId: cartId ?? "", itemIndex: index }));
    },
  };

  const itemWithoutStock: Item[] = []

  cartBFF?.items?.forEach((item, index) => {
    if (item.product.availability === withoutStock) {
      const product = {
        ...item,
        index
      }
      itemWithoutStock.push(product)
    }
  })

  const renderProductWithoutStock = () => {
    return (
      <>
      <ProductCardWithouthStock items={itemWithoutStock} onRemoveFromCart={(index:number) => {
        methods.handleRemoveFromCart(index)
      }}/>
      <AvailableProductText>Productos disponibles</AvailableProductText>
    </>
    )
  }


  return (
    <BodyContainer>
      {error ? <MinicartError title={error.message} /> : null}

      {itemWithoutStock?.length ? renderProductWithoutStock() : null}

      {cartBFF?.items?.map((item, index) => (
        <ProductCard
          key={item.itemId}
          item={item}
          index={index}
          onRemoveFromCart={() => {
            methods.handleRemoveFromCart(index);
          }}
          onIncrementQuantity={() => {
            dispatch(incrementProductQuantity(index));
            methods.handleIncrementQuantity(item, index);
          }}
          onDecrementQuantity={() => {
            dispatch(decrementProductQuantity(index));
            methods.handleDecrementQuantity(item, index);
          }}
        />
      ))}
    </BodyContainer>
  );
};

export default Body;
