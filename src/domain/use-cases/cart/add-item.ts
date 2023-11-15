import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddItemRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import { AxiosError } from 'axios';
import handleHttpError from '@use-cases/error/handle-http-errors';
import {
  CartAction,
  MessagesError,
  ResponseError,
} from '@entities/error/error.entity';
import { setError } from '@store/error';
import handlePayloadError from '@use-cases/error/handle-payload-errors';

const addItem = createAsyncThunk(
  '/cart/addItem',
  async (
    dataRequest: AddItemRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService.addItem(dataRequest);
      const messagesError = data?.messagesErrors;

      if (messagesError?.length) {
        const cartError = handlePayloadError(
          messagesError[0] as unknown as MessagesError,
          CartAction.ADD,
        );
        dispatch(setError(cartError));
      }
      return fulfillWithValue(data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError?.response?.data as ResponseError;

      if (errorData) {
        const cartError = handleHttpError(errorData, CartAction.ADD);
        dispatch(setError(cartError));
      }
      return rejectWithValue(error);
    }
  },
);

export default addItem;
