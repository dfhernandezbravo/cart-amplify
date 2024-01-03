import ProductCardMobile from '@modules/cart/components/organisms/ProductCardMobile';

//Hooks
import { Cart, Item } from '@entities/cart/cart.entity';
import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import useItemWithoutStock from '@hooks/useItemWithoutStock';
import useProductCardEvent from '@hooks/useProductCardEvent';

//Styles
import { Loader, ContainerMobile } from './styles';
import ProductAvailableTitle from '@components/atoms/ProductAvailableTitle';
import ProductsUnavailable from '@modules/cart/components/organisms/ProductCard/components/ProductsUnavailable';

const MainMobile = () => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);
  const { productCannotBeDelivered, productWithoutStock } = useItemWithoutStock(
    cartBFF as Cart,
  );
  const { methods, updatedIndexItem } = useProductCardEvent(
    cartBFF?.id as string,
  );
  const itemLength = cartBFF?.items?.length;

  return (
    <ContainerMobile>
      {loading && <Loader />}
      {productWithoutStock || productCannotBeDelivered?.length ? (
        <ProductsUnavailable />
      ) : null}

      {productWithoutStock?.length || productCannotBeDelivered?.length ? (
        <ProductAvailableTitle />
      ) : null}
      {cartBFF?.items?.map((item: Item, index: number) => (
        <ProductCardMobile
          key={item?.itemId}
          item={item}
          itemStockModify={
            index === updatedIndexItem?.index
              ? (updatedIndexItem.availableQuantity as number)
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
