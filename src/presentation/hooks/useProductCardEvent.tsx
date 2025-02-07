//Hooks
import { useAppDispatch } from './storeHooks';
import cartSlice, { quantitySelected } from '@store/cart';

import updateItem from '@use-cases/cart/update-item';
import deleteItem from '@use-cases/cart/delete-item';
import { UpdateItemRequest } from '@entities/cart/cart.request';

const useProductCardEvent = (cartId: string) => {
  const { setQuantitySelected } = cartSlice.actions;
  const dispatch = useAppDispatch();

  const methods = {
    handleChangeQuantity: (quantity: string, index: number) => {
      const itemSelected = {
        quantity: Number(quantity),
        index,
      };

      const productToUpdate: UpdateItemRequest = {
        cartId: cartId ?? '',
        items: [itemSelected],
        sentFrom: 'CART',
      };
      dispatch(setQuantitySelected(itemSelected));
      dispatch(updateItem(productToUpdate));
    },
    handleRemoveFromCart: (index: number) => {
      dispatch(setQuantitySelected(quantitySelected));
      dispatch(
        deleteItem({
          cartId: cartId ?? '',
          itemIndex: index,
          sentFrom: 'CART',
        }),
      );
    },
  };

  return {
    methods,
  };
};

export default useProductCardEvent;
