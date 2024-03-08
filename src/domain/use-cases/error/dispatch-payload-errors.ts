import { setError } from '@store/error';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import handlePayloadError from './handle-payload-errors';
import { Cart } from '@entities/cart/cart.entity';
import cartSlice from '@store/cart';
import { SentFrom } from '@entities/cart/cart.request';

const dispatchPayloadErrors = (
  data: Cart,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  sentFrom: SentFrom,
  sentQuantity?: number,
) => {
  const { setSelectedQuantityMinicart } = cartSlice.actions;
  const messagesError = data?.messagesErrors;

  if (messagesError?.length) {
    const cartError = handlePayloadError(messagesError, sentFrom);
    if (cartError) {
      if (cartError?.ean) {
        const productIndex = data?.items.findIndex(
          (item) => item.product.ean === cartError.ean,
        );

        if (
          productIndex !== undefined &&
          productIndex !== -1 &&
          data?.items[productIndex]?.quantity
        ) {
          dispatch(
            setSelectedQuantityMinicart({
              availableQuantity: data.items[productIndex].quantity,
              index: productIndex,
              sentQuantity: sentQuantity,
            }),
          );
        }
      }

      dispatch(setError(cartError));
    }
  }
};

export default dispatchPayloadErrors;
