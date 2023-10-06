import { useEffect } from 'react'
import ProductCardMobile from "@modules/cart/components/organisms/ProductCardMobile";
import ProductCartWithoutStockMobile  from '@modules/cart/components/organisms/ProductCardMobile/components/ProductCardWithoutStockMobile';

//Hooks
import { Item } from "@entities/cart/cart.entity";
import { useAppSelector, useAppDispatch } from "@hooks/storeHooks";
import useItemWithoutStock from "@hooks/useItemWithoutStock";
import useProductCardEvent from "@hooks/useProductCardEvent";
import cartSlice from '@store/cart';


//Styles
import { Loader, ContainerMobile } from "./styles";
import showToast from '@components/atoms/ToastContainer/ToastMessage';


const MainMobile = () => {



  const { cartBFF, loading, quantitySelected } = useAppSelector(state => state.cart)
  const  { setQuantitySelected} = cartSlice.actions
  const itemWithoutStock = useItemWithoutStock(cartBFF)
  const dispatch = useAppDispatch()


  const { methods, updatedIndexItem, setUpdatedIndexItem } = useProductCardEvent(cartBFF?.id as string)

  useEffect(() => {

    if (quantitySelected.availableQuantity) {
      setUpdatedIndexItem(quantitySelected)
      showToast({
        title: 'Hubo cambios en tus productos',
        description:
          'Lo sentimos, no contamos con la cantidad de unidades seleccionadas.',
        type: 'warning',
        position: 'top-center'
      });
      dispatch(setQuantitySelected({index: null, quantity: null, availableQuantity: null}))
    }

  },[cartBFF])

  return (
    <ContainerMobile>
      {loading && <Loader />}
      {itemWithoutStock.length > 0 ? (
        <ProductCartWithoutStockMobile
          items={itemWithoutStock}
          onRemoveFromCart={(index:number) => methods.handleRemoveFromCart(index)}
        />
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
        />
      ))}
    </ContainerMobile>
  )
}

export default MainMobile