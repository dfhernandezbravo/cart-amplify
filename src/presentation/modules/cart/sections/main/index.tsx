import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import { selectCart, selectTotalProductsInCart } from "@store/cart";
import ProductCard from "@modules/cart/components/organisms/ProductCard";
import { Item, ProductAvailability } from "@entities/cart/cart.entity";
import { Container, TotalProductsContainer } from "./styles";
import updateItem from "@use-cases/cart/update-item";
import ProductCartWithoutStock from '@modules/cart/components/organisms/ProductCard/ProductCardWithoutStock'
import deleteItem from "@use-cases/cart/delete-item";

const Main = () => {
  // hooks
  const { cartBFF, cartId } = useAppSelector(selectCart);
  const totalProducts = useAppSelector(selectTotalProductsInCart);
  const dispatch = useAppDispatch();

  // methods
  const methods = {
    handleChangeQuantity: (product: Item, quantity: string, index: number) => {
      const productToUpdate = {
        cartId: cartId ?? '',
        items: [{ quantity: Number(quantity), index }]
      }
      dispatch(updateItem(productToUpdate))

    },
    handleRemoveFromCart: (index: number) => {
      // TODO: update with new endpoint
      console.log('removed item', index)
      dispatch(deleteItem({cartId: cartId ?? '', itemIndex: index}))
    },
  };

  const itemWithoutStock: Item[] = []

  cartBFF?.items?.forEach((item, index) => {
    const availability = item.product.availability
    if (availability ===  ProductAvailability.WITHOUTSTOCK ||availability === ProductAvailability.CANNOTBEDELIVERED) {
      const product = {
        ...item,
        index
      }
      itemWithoutStock.push(product)
    }
  })

  return (
    <Container>
      <TotalProductsContainer>
        Tu compra {`${totalProducts}`}
      </TotalProductsContainer>

      { itemWithoutStock.length &&
        <ProductCartWithoutStock
          items={itemWithoutStock}
          onRemoveFromCart={(index) => methods.handleRemoveFromCart(index) } />
      }


      {cartBFF?.items?.map((item: Item, index: number) => (
        <ProductCard
          key={item?.itemId}
          item={item}
          onRemoveFromCart={() => {
            methods.handleRemoveFromCart(index);
          }}
          handleChangeQuantity={(product, quantity) =>
            methods.handleChangeQuantity(product, quantity, index)
          }
        />
      ))}
    </Container>
  );
};

export default Main;
