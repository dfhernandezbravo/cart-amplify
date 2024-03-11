import { useAppSelector } from '@hooks/storeHooks';
// import SnackBars from '@components/atoms/SnackBars';
import { selectTotalProductsInCart } from '@store/cart';
import ProductCard from '@modules/cart/components/organisms/ProductCard';
import ProductsUnavailable from '@modules/cart/components/organisms/ProductCard/components/ProductsUnavailable';
import { Cart, Item, ProductAvailability } from '@entities/cart/cart.entity';
import { Container, TotalProductsContainer, Loader } from './styles';
import useItemWithoutStock from '../../../../hooks/useItemWithoutStock';
import useProductCardEvent from '@hooks/useProductCardEvent';
import ProductAvailableTitle from '@components/atoms/ProductAvailableTitle';

const Main = () => {
  const { cartBFF, loading, quantitySelected } = useAppSelector(
    (state) => state.cart,
  );
  const totalProducts = useAppSelector(selectTotalProductsInCart);
  const { methods } = useProductCardEvent(cartBFF?.id as string);

  const itemLength = cartBFF?.items?.length;
  const { productCannotBeDelivered, productWithoutStock } = useItemWithoutStock(
    cartBFF as Cart,
  );

  const existProductAvailable = cartBFF?.items?.some(
    (item) => item.product.availability === ProductAvailability.AVAILABLE,
  );

  const generateTextTotalizer = (total: number) => {
    return `(${total} ${total > 1 ? 'productos' : 'producto'})`;
  };

  return (
    <Container>
      <TotalProductsContainer>
        Tu compra <span>{generateTextTotalizer(totalProducts as number)}</span>
      </TotalProductsContainer>
      {/* <SnackBars description='Los valores fueron cambiados.' horizontal='center' vertical='bottom' open={OpenSnackbars} close={() => setOpenSnackbars(false)}/> */}
      <div className="items-container">
        {loading && <Loader />}
        {productWithoutStock?.length || productCannotBeDelivered?.length ? (
          <ProductsUnavailable />
        ) : null}

        {(productWithoutStock?.length || productCannotBeDelivered?.length) &&
        existProductAvailable ? (
          <ProductAvailableTitle />
        ) : null}
        {cartBFF?.items?.map((item: Item, index: number) => (
          <ProductCard
            key={index}
            item={item}
            itemStockModify={
              index === quantitySelected?.index
                ? (quantitySelected.availableQuantity as number)
                : null
            }
            onRemoveFromCart={() => {
              methods.handleRemoveFromCart(index);
            }}
            handleChangeQuantity={(quantity) =>
              methods.handleChangeQuantity(quantity, index)
            }
            index={index}
            itemLength={itemLength as number}
          />
        ))}
      </div>
    </Container>
  );
};

export default Main;
