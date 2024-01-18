import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddProductServiceRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import getInstanceHttp from './get-instance-http';

const addProductService = createAsyncThunk(
  '/cart/addService',
  async (
    dataRequest: AddProductServiceRequest,
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService(getInstanceHttp()).addProductService(
        dataRequest,
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default addProductService;
