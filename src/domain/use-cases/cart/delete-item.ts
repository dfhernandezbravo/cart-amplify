import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart } from '@entities/cart/cart.entity';
import { DeleteItemRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import { CartAction } from '@entities/error/error.entity';
import { AxiosError } from 'axios';
// import dispatchPayloadErrors from '@use-cases/error/dispatch-payload-errors';
import dispatchHttpErrors from '@use-cases/error/dispatch-http-errors';
import getInstanceHttp from './get-instance-http';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import WindowsEvents from '@events/index';

const deleteItem = createAsyncThunk(
  '/cart/deleteItem',
  async (
    dataRequest: DeleteItemRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data, status } = await cartService(getInstanceHttp()).deleteItem(
        dataRequest,
      );

      console.log('status', status);

      if (status === 204) {
        console.log('Sin items');
        customDispatchEvent({
          name: WindowsEvents.DISPATCH_SHOPPING_CART_WITHOUT_ITEMS,
          detail: {},
        });

        return {} as Cart;
      }

      customDispatchEvent({
        name: WindowsEvents.UPDATE_SHOPPING_CART,
        detail: { shoppingCart: data },
      });

      // dispatchPayloadErrors(data, dispatch, CartAction.DELETE);
      return fulfillWithValue(data);
    } catch (error) {
      dispatchHttpErrors(error as AxiosError, dispatch, CartAction.DELETE);
      return rejectWithValue(error);
    }
  },
);

export default deleteItem;
