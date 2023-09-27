import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import SnackBars from '@components/atoms/SnackBars';
import {
  selectTotalProductsInCart,
} from '@store/minicart';
import ProductCard from '@modules/cart/components/organisms/ProductCard';
import ProductCartWithoutStock from '@modules/cart/components/organisms/ProductCard/components/ProductCardWithoutStock';
import { Cart, Item } from '@entities/cart/cart.entity';
import { Container, TotalProductsContainer, Loader } from './styles';
import showToast from '@components/atoms/ToastContainer/ToastMessage';
import cartSlice from '@store/cart';
import useItemWithoutStock from '../../../../hooks/useItemWithoutStock';
import useProductCardEvent from '@hooks/useProductCardEvent';

import { quantitySelected } from '@store/cart'

const Main = () => {
  
  const { cartBFF, quantitySelected, loading } =
    useAppSelector(state => state.cart);

  const totalProducts = useAppSelector(selectTotalProductsInCart);
  const { setQuantitySelected } = cartSlice.actions

  const dispatch = useAppDispatch();

  const {methods, updatedIndexItem, setUpdatedIndexItem} = useProductCardEvent(cartBFF?.id as string)


  useEffect(() => {

    if (quantitySelected.availableQuantity) {
      setUpdatedIndexItem(quantitySelected)
      showToast({
        title: 'Hubo cambios en tus productos',
        description:
          'Lo sentimos, no contamos con la cantidad de unidades seleccionadas.',
        type: 'warning'
      });
      dispatch(setQuantitySelected(quantitySelected))
    }

  },[cartBFF])

  const itemWithoutStock = useItemWithoutStock(cartBFF as Cart)

  return (
    <Container>
      <TotalProductsContainer>
        Tu compra {`${totalProducts}`}
      </TotalProductsContainer>
      {/* <SnackBars description='Los valores fueron cambiados.' horizontal='center' vertical='bottom' open={OpenSnackbars} close={() => setOpenSnackbars(false)}/> */}
      <div className="items-container">
        {loading && <Loader />}
        {itemWithoutStock.length ? (
          <ProductCartWithoutStock
            items={itemWithoutStock}
            onRemoveFromCart={(index) => methods.handleRemoveFromCart(index)}
          />
        ) : null}

        {cartBFF?.items?.map((item: Item, index: number) => (
          <ProductCard
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
          />
        ))}
      </div>
    </Container>
  );
};

export default Main;
