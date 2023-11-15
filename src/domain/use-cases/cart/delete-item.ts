import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart } from '@entities/cart/cart.entity';
import { DeleteItemRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import handlePayloadError from '@use-cases/error/handle-payload-errors';
import {
  CartAction,
  MessagesError,
  ResponseError,
} from '@entities/error/error.entity';
import { setError } from '@store/error';
import { AxiosError } from 'axios';
import handleHttpError from '@use-cases/error/handle-http-errors';

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

      const messagesError = data?.messagesErrors;

      if (messagesError?.length) {
        const cartError = handlePayloadError(
          messagesError[0] as unknown as MessagesError,
          CartAction.DELETE,
        );
        dispatch(setError(cartError));
      }
      return fulfillWithValue(data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError?.response?.data as ResponseError;

      if (errorData) {
        const cartError = handleHttpError(errorData, CartAction.DELETE);
        dispatch(setError(cartError));
      }
      return rejectWithValue(error);
    }
  },
);

export default deleteItem;
