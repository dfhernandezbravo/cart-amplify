import { UpdateItemRequest } from '@entities/cart/cart.request';
import { CartAction } from '@entities/error/error.entity';
import { createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cart';
import dispatchHttpErrors from '@use-cases/error/dispatch-http-errors';
// import dispatchPayloadErrors from '@use-cases/error/dispatch-payload-errors';
import { AxiosError } from 'axios';
import getInstanceHttp from './get-instance-http';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import WindowsEvents from '@events/index';

const updateItem = createAsyncThunk(
  '/cart/updateItem',
  async (
    dataRequest: UpdateItemRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService(getInstanceHttp()).updateItem(
        dataRequest,
      );
      // dispatchPayloadErrors(data, dispatch, CartAction.UPDATE);
      customDispatchEvent({
        name: WindowsEvents.UPDATE_SHOPPING_CART,
        detail: { shoppingCart: data },
      });
      console.log('updated Item, data: ', data);
      return fulfillWithValue(data);
    } catch (error) {
      dispatchHttpErrors(error as AxiosError, dispatch, CartAction.UPDATE);
      return rejectWithValue(error);
    }
  },
);

export default updateItem;
