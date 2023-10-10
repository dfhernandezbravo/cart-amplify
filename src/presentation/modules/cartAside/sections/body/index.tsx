import { useCallback } from "react";
import _ from "lodash";
import cartSlice from '@store/cart'
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
const cannotBeDelivered = 'cannotBeDelivered'

const Body = () => {
  // Hooks
  const { cartId, cartBFF } = useAppSelector(state => state.cart);
  const { error } = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const { decrementProductQuantity, incrementProductQuantity, removeProduct} = cartSlice.actions

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
    const availability = item.product.availability
    if (availability === withoutStock ||availability === cannotBeDelivered ) {
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
      {/* {error ? <MinicartError title={error.message} /> : null} */}

      {itemWithoutStock?.length ? renderProductWithoutStock() : null}

      {cartBFF?.items?.map((item: Item, index: number)=> (
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
