import { GetCartRequest } from '@entities/cart/cart.request';
import { createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cart';
import productsService from '@services/products';
import getInstanceHttp from './get-instance-http';
import { getProductIds } from './get-product-ids';
import { cartWithRibbons } from './cart-with-ribbons';

const getCart = createAsyncThunk(
  '/cart/getCart',
  async (dataRequest: GetCartRequest) => {
    try {
      const { data } = await cartService(getInstanceHttp()).getCart(
        dataRequest,
      );
      const productIds = getProductIds(data);
      const productsWithRibbons = await productsService(
        getInstanceHttp(),
      ).getProductsByIds(productIds);
      const newCart = cartWithRibbons(data, productsWithRibbons.data);
      return newCart;
    } catch (error) {
      console.error(error);
    }
  },
);

export const getCartSync = async (dataRequest: GetCartRequest) => {
  try {
    const { data } = await cartService(getInstanceHttp()).getCart(dataRequest);
    const productIds = getProductIds(data);
    const productsWithRibbons = await productsService(
      getInstanceHttp(),
    ).getProductsByIds(productIds);
    const newCart = cartWithRibbons(data, productsWithRibbons.data);
    return newCart;
  } catch (error) {
    throw new Error('Error al cargar el carro');
  }
};

export default getCart;
