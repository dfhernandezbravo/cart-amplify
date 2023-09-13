import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddItemRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';

const addItem = createAsyncThunk(
  '/cart/addItem',
  async (dataRequest: AddItemRequest) => {
    try {
      const { data } = await cartService.addItem(dataRequest);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
);

export default addItem;
