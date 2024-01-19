import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddItemRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import { AxiosError } from 'axios';
import { CartAction } from '@entities/error/error.entity';
import dispatchHttpErrors from '@use-cases/error/dispatch-http-errors';
import getInstanceHttp from './get-instance-http';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import WindowsEvents from '@events/index';
// import dispatchPayloadErrors from '@use-cases/error/dispatch-payload-errors';

const addItem = createAsyncThunk(
  '/cart/addItem',
  async (
    dataRequest: AddItemRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService(getInstanceHttp()).addItem(
        dataRequest,
      );
      customDispatchEvent({
        name: WindowsEvents.UPDATE_SHOPPING_CART,
        detail: { shoppingCart: data },
      });
      // dispatchPayloadErrors(data, dispatch, CartAction.ADD);
      return fulfillWithValue(data);
    } catch (error) {
      dispatchHttpErrors(error as AxiosError, dispatch, CartAction.ADD);
      return rejectWithValue(error);
    }
  },
);

export default addItem;
