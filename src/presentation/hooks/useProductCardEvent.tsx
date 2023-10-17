import { useState, useEffect } from 'react';

//Hooks
import { QuantitySelectedProps } from '@store/cart/types';
import { useAppDispatch, useAppSelector } from './storeHooks';
import cartSlice from '@store/cart';
import useBreakpoints from './useBreakpoints';

import updateItem from '@use-cases/cart/update-item';
import deleteItem from '@use-cases/cart/delete-item';

import { quantitySelected as defaultQuantity } from '@store/cart';
import { changeOfAmount } from '@components/atoms/ToastContainer/customMessage';

const useProductCardEvent = (cartId: string) => {
  const [updatedIndexItem, setUpdatedIndexItem] =
    useState<QuantitySelectedProps | null>(null);

  const { quantitySelected } = useAppSelector((state) => state.cart);
  const { setQuantitySelected } = cartSlice.actions;
  const dispatch = useAppDispatch();

  const { isXs, isSm } = useBreakpoints();

  const isMobile = isXs || isSm;

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

      dispatch(setQuantitySelected(itemSelected));
      dispatch(updateItem(productToUpdate));
    },
    handleRemoveFromCart: (index: number) => {
      dispatch(deleteItem({ cartId: cartId ?? '', itemIndex: index }));
    },
  };

  useEffect(() => {
    if (quantitySelected.availableQuantity) {
      setUpdatedIndexItem(quantitySelected);
      dispatch(setQuantitySelected(quantitySelected));
      dispatch(setQuantitySelected(defaultQuantity));
      if (isMobile) {
        changeOfAmount({ position: 'top-center' });
        return;
      }
      changeOfAmount();
    }
  }, [quantitySelected]);

  return {
    methods,
    updatedIndexItem,
  };
};

export default useProductCardEvent;
