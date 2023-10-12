import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart } from '@entities/cart/cart.entity';
import { DeleteItemRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';

const deleteItem = createAsyncThunk(
  '/cart/deleteItem',
  async (dataRequest: DeleteItemRequest) => {
    try {
      const { data, status } = await cartService.deleteItem(dataRequest);

      if (status === 204) {
        return {} as Cart;
      }

      return data;
    } catch (error) {
      console.error(error);
    }
  },
);

export default deleteItem;
