import ProductCardMobile from '@modules/cart/components/organisms/ProductCardMobile';
import ProductCartWithoutStockMobile from '@modules/cart/components/organisms/ProductCardMobile/components/ProductCardWithoutStockMobile';

//Hooks
import { Item } from '@entities/cart/cart.entity';
import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import useItemWithoutStock from '@hooks/useItemWithoutStock';
import useProductCardEvent from '@hooks/useProductCardEvent';

//Styles
import { Loader, ContainerMobile } from './styles';
import ProductAvailableTitle from '@components/atoms/ProductAvailableTitle';

const MainMobile = () => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);
  const itemWithoutStock = useItemWithoutStock(cartBFF);
  const { methods, updatedIndexItem } = useProductCardEvent(
    cartBFF?.id as string,
  );
  const itemLength = cartBFF?.items?.length;

  return (
    <ContainerMobile>
      {loading && <Loader />}
      {itemWithoutStock.length > 0 ? (
        <ProductCartWithoutStockMobile
          items={itemWithoutStock}
          onRemoveFromCart={(index: number) =>
            methods.handleRemoveFromCart(index)
          }
        />
      ) : null}
      {itemWithoutStock.length && <ProductAvailableTitle />}
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
