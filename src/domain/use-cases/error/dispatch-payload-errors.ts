import { CartAction, MessagesError } from '@entities/error/error.entity';
import { setError } from '@store/error';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import handlePayloadError from './handle-payload-errors';
import { Cart } from '@entities/cart/cart.entity';

const dispatchPayloadErrors = (
  data: Cart,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  action: CartAction,
) => {
  const messagesError = data?.messagesErrors;
  if (messagesError?.length) {
    const cartError = handlePayloadError(
      messagesError[0] as unknown as MessagesError,
      action,
    );
    dispatch(setError(cartError));
  }
};

export default dispatchPayloadErrors;
