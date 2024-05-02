import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cart } from '@entities/cart/cart.entity';
import { DeleteItemRequest } from '@entities/cart/cart.request';
import cartService from '@services/cart';
import { CartAction } from '@entities/error/error.entity';
import { AxiosError } from 'axios';
import dispatchPayloadErrors from '@use-cases/error/dispatch-payload-errors';
import dispatchHttpErrors from '@use-cases/error/dispatch-http-errors';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import WindowsEvents from '@events/index';
import AddRibbonsToItems from './add-ribbons';

const deleteItem = createAsyncThunk(
  '/cart/deleteItem',
  async (
    dataRequest: DeleteItemRequest,
    { dispatch, fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { data, status } = await cartService.deleteItem(dataRequest);

      if (status === 204) {
        customDispatchEvent({
          name: WindowsEvents.DISPATCH_SHOPPING_CART_WITHOUT_ITEMS,
          detail: { origin: 'CART' },
        });

        return {} as Cart;
      }

      const itemWithRibbons = await AddRibbonsToItems(data);

      customDispatchEvent({
        name: WindowsEvents.UPDATE_SHOPPING_CART,
        detail: { shoppingCart: data, origin: 'CART' },
      });

      dispatchPayloadErrors(data, dispatch, dataRequest.sentFrom);
      return fulfillWithValue(itemWithRibbons);
    } catch (error) {
      dispatchHttpErrors(
        error as AxiosError,
        dispatch,
        CartAction.DELETE,
        dataRequest.sentFrom,
      );
      return rejectWithValue(error);
    }
  },
);

export default deleteItem;
