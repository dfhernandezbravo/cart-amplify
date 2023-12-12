import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddProductServiceRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import { AxiosError } from 'axios';
import { CartAction } from '@entities/error/error.entity';
import dispatchHttpErrors from '@use-cases/error/dispatch-http-errors';

const addProductService = createAsyncThunk(
  '/cart/addService',
  async (
    dataRequest: AddProductServiceRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService.addProductService(dataRequest);
      return fulfillWithValue(data);
    } catch (error) {
      // dispatchHttpErrors(error as AxiosError, dispatch, CartAction.ADD_SERVICE);
      return rejectWithValue(error);
    }
  },
);

export default addProductService;
