import { createAsyncThunk } from '@reduxjs/toolkit';
import { DeleteProductServiceRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import getInstanceHttp from './get-instance-http';

const deleteProductService = createAsyncThunk(
  '/cart/deleteService',
  async (
    dataRequest: DeleteProductServiceRequest,
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService(
        getInstanceHttp(),
      ).deleteProductService(dataRequest);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default deleteProductService;
