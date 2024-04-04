import { GetCartRequest } from '@entities/cart/cart.request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cart';
import getInstanceHttp from './get-instance-http';
import AddRibbonsToItems from './add-ribbons';

const getCart = createAsyncThunk(
  '/cart/getCart',
  async (dataRequest: GetCartRequest) => {
    try {
      const { data } = await cartService(getInstanceHttp()).getCart(
        dataRequest,
      );
      const itemWithRibbons = await AddRibbonsToItems(data);
      return itemWithRibbons;
    } catch (error) {
      console.error(error);
    }
  },
);

export const getCartSync = async (dataRequest: GetCartRequest) => {
  try {
    const { data } = await cartService(getInstanceHttp()).getCart(dataRequest);
    const itemWithRibbons = await AddRibbonsToItems(data);
    return itemWithRibbons;
  } catch (error) {
    throw new Error('Error al cargar el carro');
  }
};

export default getCart;
