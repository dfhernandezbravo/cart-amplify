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
import { PromotionType } from '@entities/cart/promotions';

const useProductCardEvent = (cartId: string) => {
  const [updatedIndexItem, setUpdatedIndexItem] =
    useState<QuantitySelectedProps | null>(null);

  const { quantitySelected, cartBFF } = useAppSelector((state) => state.cart);
  const { setQuantitySelected } = cartSlice.actions;
  const dispatch = useAppDispatch();

  const { isXs, isSm } = useBreakpoints();

  const isMobile = isXs || isSm;
  const methods = {
    handleChangeQuantity: (quantity: string, index: number) => {
      setUpdatedIndexItem(defaultQuantity);

      const itemSelected = {
        quantity: Number(quantity),
        index,
      };

      const productToUpdate = {
        cartId: cartId ?? '',
        items: [itemSelected],
      };
      console.log({ productToUpdate });

      dispatch(setQuantitySelected(itemSelected));
      dispatch(updateItem(productToUpdate));
    },
    handleRemoveFromCart: (index: number) => {
      dispatch(deleteItem({ cartId: cartId ?? '', itemIndex: index }));
    },
  };

  useEffect(() => {
    const productIndex = quantitySelected?.index as number;
    const productId = cartBFF?.items[productIndex]?.product.id;
    const productModified = cartBFF?.items.filter(
      (item) => item.product.id === productId,
    );
    const isMxnPromotion = productModified?.filter(
      (product) => product.adjustment[0]?.id === PromotionType.MxN,
    );

    if (isMxnPromotion?.length) return;

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
