import { useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import SnackBars from '@components/atoms/SnackBars';
import {
  selectCart,
  selectTotalProductsInCart,
} from '@store/cart';
import ProductCard from '@modules/cart/components/organisms/ProductCard';
import ProductCartWithoutStock from '@modules/cart/components/organisms/ProductCard/components/ProductCardWithoutStock';
import { Item, ProductAvailability } from '@entities/cart/cart.entity';
import updateItem from '@use-cases/cart/update-item';
import deleteItem from '@use-cases/cart/delete-item';
import { getUnavailableProduct } from '@utils/helpers';
import { Container, TotalProductsContainer, Loader } from './styles';
import showToast from '@components/atoms/ToastContainer/ToastMessage';
import cartSlice from '@store/cart';
import { QuantitySelectedProps } from '@store/cart/types';



const Main = () => {
  // hooks
  // const [OpenSnackbars, setOpenSnackbars] = useState(true)
  const [updatedIndexItem, setUpdatedIndexItem] = useState<QuantitySelectedProps | null>(
    null,
  );

  const { cartBFF, cartId, quantitySelected, loading } =
    useAppSelector(selectCart);

  const totalProducts = useAppSelector(selectTotalProductsInCart);
  const { setQuantitySelected } = cartSlice.actions

  const dispatch = useAppDispatch();


  useEffect(() => {

    if (quantitySelected.availableQuantity) {
      setUpdatedIndexItem(quantitySelected)
      showToast({
        title: 'Hubo cambios en tus productos',
        description:
          'Lo sentimos, no contamos con la cantidad de unidades seleccionadas.',
        type: 'warning'
      });
      dispatch(setQuantitySelected({index: null, quantity: null, availableQuantity: null}))
    }

  },[cartBFF])




  // methods
  const methods = {
    handleChangeQuantity: (quantity: string, index: number) => {
      
      setUpdatedIndexItem({index:null, quantity: null, availableQuantity: null});

      const itemSelected = {
        quantity: Number(quantity),
        index,
      };

      const productToUpdate = {
        cartId: cartId ?? '',
        items: [itemSelected],
      };

      dispatch(setQuantitySelected(itemSelected))
      dispatch(updateItem(productToUpdate));

    },
    handleRemoveFromCart: (index: number) => {
      dispatch(deleteItem({ cartId: cartId ?? '', itemIndex: index }));
    },
  };

  const itemWithoutStock = useMemo(() => {
    return cartBFF?.items.length ? getUnavailableProduct(cartBFF) : [];
  }, [cartBFF]);

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
