import { UpdateItemRequest } from '@entities/cart/cart.request';
import { CartAction } from '@entities/error/error.entity';
import { createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cart';
import dispatchHttpErrors from '@use-cases/error/dispatch-http-errors';
import dispatchPayloadErrors from '@use-cases/error/dispatch-payload-errors';
import { AxiosError } from 'axios';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import WindowsEvents from '@events/index';
import AddRibbonsToItems from './add-ribbons';

const updateItem = createAsyncThunk(
  '/cart/updateItem',
  async (
    dataRequest: UpdateItemRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data } = await cartService.updateItem(dataRequest);
      dispatchPayloadErrors(
        data,
        dispatch,
        dataRequest.sentFrom,
        dataRequest.items[0].quantity,
      );
      customDispatchEvent({
        name: WindowsEvents.UPDATE_SHOPPING_CART,
        detail: { shoppingCart: data, origin: 'CART' },
      });
      const itemWithRibbons = await AddRibbonsToItems(data);
      return fulfillWithValue(itemWithRibbons);
    } catch (error) {
      dispatchHttpErrors(
        error as AxiosError,
        dispatch,
        CartAction.UPDATE,
        dataRequest.sentFrom,
      );
      return rejectWithValue(error);
    }
  },
);

export default updateItem;
