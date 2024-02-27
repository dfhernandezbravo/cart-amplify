//Hooks
import { useAppDispatch } from './storeHooks';
import cartSlice, { quantitySelected } from '@store/cart';

import updateItem from '@use-cases/cart/update-item';
import deleteItem from '@use-cases/cart/delete-item';

const useProductCardEvent = (cartId: string) => {
  const { setQuantitySelected } = cartSlice.actions;
  const dispatch = useAppDispatch();

  const methods = {
    handleChangeQuantity: (quantity: string, index: number) => {
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
      dispatch(setQuantitySelected(quantitySelected));
      dispatch(deleteItem({ cartId: cartId ?? '', itemIndex: index }));
    },
  };

  return {
    methods,
  };
};

export default useProductCardEvent;
