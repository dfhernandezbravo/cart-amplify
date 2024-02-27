import ProductCardMobile from '@modules/cart/components/organisms/ProductCardMobile';

//Hooks
import { Cart, Item, ProductAvailability } from '@entities/cart/cart.entity';
import { useAppSelector } from '@hooks/storeHooks';
import useItemWithoutStock from '@hooks/useItemWithoutStock';
import useProductCardEvent from '@hooks/useProductCardEvent';

//Styles
import { Loader, ContainerMobile } from './styles';
import ProductAvailableTitle from '@components/atoms/ProductAvailableTitle';
import ProductsUnavailable from '@modules/cart/components/organisms/ProductCard/components/ProductsUnavailable';

const MainMobile = () => {
  const { cartBFF, loading, quantitySelected } = useAppSelector(
    (state) => state.cart,
  );
  const { productCannotBeDelivered, productWithoutStock } = useItemWithoutStock(
    cartBFF as Cart,
  );
  const { methods } = useProductCardEvent(cartBFF?.id as string);
  const itemLength = cartBFF?.items?.length;
  const existProductAvailable = cartBFF?.items?.some(
    (item) => item.product.availability === ProductAvailability.AVAILABLE,
  );

  return (
    <ContainerMobile>
      {loading && <Loader />}
      {productWithoutStock || productCannotBeDelivered?.length ? (
        <ProductsUnavailable />
      ) : null}

      {productWithoutStock?.length ||
      (productCannotBeDelivered?.length && existProductAvailable) ? (
        <ProductAvailableTitle />
      ) : null}
      {cartBFF?.items?.map((item: Item, index: number) => (
        <ProductCardMobile
          key={item?.itemId}
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
    </ContainerMobile>
  );
};

export default MainMobile;
