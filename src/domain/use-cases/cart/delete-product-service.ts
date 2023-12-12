import { createAsyncThunk } from '@reduxjs/toolkit';
import { DeleteProductServiceRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import { AxiosError } from 'axios';
import { CartAction } from '@entities/error/error.entity';
import dispatchHttpErrors from '@use-cases/error/dispatch-http-errors';

const deleteProductService = createAsyncThunk(
  '/cart/deleteService',
  async (
    dataRequest: DeleteProductServiceRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService.deleteProductService(dataRequest);
      return fulfillWithValue(data);
    } catch (error) {
      // dispatchHttpErrors(error as AxiosError, dispatch, CartAction.DELETE_SERVICE);
      return rejectWithValue(error);
    }
  },
);

export default deleteProductService;
