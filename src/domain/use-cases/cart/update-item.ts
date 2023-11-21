import { UpdateItemRequest } from '@entities/cart/cart.request';
import { CartAction } from '@entities/error/error.entity';
import { createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cart';
import dispatchHttpErrors from '@use-cases/error/dispatch-http-errors';
import dispatchPayloadErrors from '@use-cases/error/dispatch-payload-errors';
import { AxiosError } from 'axios';

const updateItem = createAsyncThunk(
  '/cart/updateItem',
  async (
    dataRequest: UpdateItemRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService.updateItem(dataRequest);
      dispatchPayloadErrors(data, dispatch, CartAction.UPDATE);
      return fulfillWithValue(data);
    } catch (error) {
      dispatchHttpErrors(error as AxiosError, dispatch, CartAction.UPDATE);
      return rejectWithValue(error);
    }
  },
);

export default updateItem;
