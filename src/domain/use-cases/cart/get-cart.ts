import { GetCartRequest } from '@entities/cart/cart.request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cart';
import getInstanceHttp from './get-instance-http';

const getCart = createAsyncThunk(
  '/cart/getCart',
  async (dataRequest: GetCartRequest) => {
    try {
      const { data } = await cartService(getInstanceHttp()).getCart(
        dataRequest,
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
);

export const getCartSync = async (dataRequest: GetCartRequest) => {
  try {
    const { data } = await cartService(getInstanceHttp()).getCart(dataRequest);
    return data;
  } catch (error) {
    throw new Error('Error al cargar el carro');
  }
};

export default getCart;
