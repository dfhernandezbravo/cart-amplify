import { useState } from 'react'

//Hooks
import { QuantitySelectedProps } from '@store/cart/types';
import { useAppDispatch } from './storeHooks';
import cartSlice from '@store/cart';
import updateItem from '@use-cases/cart/update-item';
import deleteItem from '@use-cases/cart/delete-item';


import { quantitySelected } from '@store/cart'

const useProductCardEvent = (cartId: string) => {


  const [updatedIndexItem, setUpdatedIndexItem] = useState<QuantitySelectedProps | null>(
    null,
  );

  const { setQuantitySelected } = cartSlice.actions
  const dispatch = useAppDispatch()

  const methods = {
    handleChangeQuantity: (quantity: string, index: number) => {

      setUpdatedIndexItem(quantitySelected);

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


  return {
    methods,
    updatedIndexItem,
    setUpdatedIndexItem
  }

}

export default useProductCardEvent