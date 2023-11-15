import { UpdateItemRequest } from '@entities/cart/cart.request';
import {
  CartAction,
  MessagesError,
  ResponseError,
} from '@entities/error/error.entity';
import { createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cart';
import { setError } from '@store/error';
import handleHttpError from '@use-cases/error/handle-http-errors';
import handlePayloadError from '@use-cases/error/handle-payload-errors';
import { AxiosError } from 'axios';

const updateItem = createAsyncThunk(
  '/cart/updateItem',
  async (
    dataRequest: UpdateItemRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService.updateItem(dataRequest);
      const messagesError = data?.messagesErrors;

      console.log('updateItem messagesError ', messagesError);

      if (messagesError?.length) {
        const cartError = handlePayloadError(
          messagesError[0] as unknown as MessagesError,
          CartAction.UPDATE,
        );
        dispatch(setError(cartError));
      }
      return fulfillWithValue(data);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError?.response?.data as ResponseError;
      console.log('updateItem errorData ', { errorData });

      if (errorData) {
        const cartError = handleHttpError(errorData, CartAction.UPDATE);
        dispatch(setError(cartError));
      }
      return rejectWithValue(error);
    }
  },
);

export default updateItem;
