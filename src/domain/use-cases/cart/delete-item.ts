import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart } from '@entities/cart/cart.entity';
import { DeleteItemRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import { CartAction } from '@entities/error/error.entity';
import { AxiosError } from 'axios';
import dispatchPayloadErrors from '@use-cases/error/dispatch-payload-errors';
import dispatchHttpErrors from '@use-cases/error/dispatch-http-errors';

const deleteItem = createAsyncThunk(
  '/cart/deleteItem',
  async (
    dataRequest: DeleteItemRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data, status } = await cartService.deleteItem(dataRequest);

      if (status === 204) {
        return {} as Cart;
      }

      dispatchPayloadErrors(data, dispatch, CartAction.DELETE);
      return fulfillWithValue(data);
    } catch (error) {
      dispatchHttpErrors(error as AxiosError, dispatch, CartAction.DELETE);
      return rejectWithValue(error);
    }
  },
);

export default deleteItem;
