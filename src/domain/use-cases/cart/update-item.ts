import { UpdateItemRequest } from '@entities/cart/cart.request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cart';

const updateItem = createAsyncThunk(
  '/cart/updateItem',
  async (dataRequest: UpdateItemRequest) => {
    try {
      const { data } = await cartService.updateItem(dataRequest);

      return data;
    } catch (error) {
      console.error(error);
    }
  },
);

export default updateItem;
