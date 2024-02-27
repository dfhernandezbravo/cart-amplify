import { setError } from '@store/error';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import handlePayloadError from './handle-payload-errors';
import { Cart } from '@entities/cart/cart.entity';
import cartSlice from '@store/cart';

const dispatchPayloadErrors = (
  data: Cart,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
) => {
  const { setSelectedQuantityMinicart } = cartSlice.actions;
  const messagesError = data?.messagesErrors;

  if (messagesError?.length) {
    const cartError = handlePayloadError(messagesError);

    console.log('dispatchPayloadErrors ', { cartError, data });

    if (cartError) {
      if (cartError?.ean) {
        const productIndex = data?.items.findIndex(
          (item) => item.product.ean === cartError.ean,
        );

        console.log('dispatchPayloadErrors productIndex', productIndex);
        console.log(
          'dispatchPayloadErrors productIndex',
          productIndex !== undefined && productIndex !== -1
            ? data?.items[productIndex]
            : null,
        );

        if (
          productIndex !== undefined &&
          productIndex !== -1 &&
          data?.items[productIndex]?.quantity
        ) {
          dispatch(
            setSelectedQuantityMinicart({
              quantity: data.items[productIndex].quantity,
              index: productIndex,
            }),
          );
        }
      }

      dispatch(setError(cartError));
    }
  }
};

export default dispatchPayloadErrors;
