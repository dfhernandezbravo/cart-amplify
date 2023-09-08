import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import { selectCart, selectTotalProductsInCart, setItemQuantity } from "@store/cart";
import ProductCard from "@modules/cart/components/organisms/ProductCard";
import { Item, ProductAvailability } from "@entities/cart/cart.entity";
import { Container, TotalProductsContainer } from "./styles";
import updateItem from "@use-cases/cart/update-item";
import ProductCartWithoutStock from "@modules/cart/components/organisms/ProductCard/components/ProductCardWithoutStock";
import deleteItem from "@use-cases/cart/delete-item";
import { getUnavailableProduct } from "@utils/helpers";


const Main = () => {
  // hooks
  const { cartBFF, cartId, quantitySelected} = useAppSelector(selectCart);
  const totalProducts = useAppSelector(selectTotalProductsInCart);
  const dispatch = useAppDispatch();

  // methods
  const methods = {
    handleChangeQuantity: (quantity: string, index: number) => {
      const itemSelected = {
        quantity: Number(quantity),
        index,
      };
      const productToUpdate = {
        cartId: cartId ?? "",
        items: [itemSelected],
      };
      dispatch(setItemQuantity(itemSelected));
      dispatch(updateItem(productToUpdate));
    },
    handleRemoveFromCart: (index: number) => {
      dispatch(deleteItem({ cartId: cartId ?? "", itemIndex: index }));
    },
  };

  const itemWithoutStock = useMemo(() => {
    return cartBFF?.items.length ? getUnavailableProduct(cartBFF) : []
  }, [cartBFF])

  return (
    <Container>
      <TotalProductsContainer>
        Tu compra {`${totalProducts}`}
      </TotalProductsContainer>

      {itemWithoutStock.length && (
        <ProductCartWithoutStock
          items={itemWithoutStock}
          onRemoveFromCart={(index) => methods.handleRemoveFromCart(index)}
        />
      )}

      {cartBFF?.items?.map((item: Item, index: number) => (
        <ProductCard
          key={item?.itemId}
          item={item}
          itemStockModify={index === quantitySelected.index  ? (quantitySelected.quantityAvailable as number) : null}
          onRemoveFromCart={() => {
            methods.handleRemoveFromCart(index);
          }}
          handleChangeQuantity={(quantity) =>
            methods.handleChangeQuantity(quantity, index)
          }
        />
      ))}
    </Container>
  );
};

export default Main;
