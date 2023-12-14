import { createAsyncThunk } from '@reduxjs/toolkit';
import { DeleteProductServiceRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';

const deleteProductService = createAsyncThunk(
  '/cart/deleteService',
  async (
    dataRequest: DeleteProductServiceRequest,
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService.deleteProductService(dataRequest);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default deleteProductService;
