import { CartAction, ResponseError } from '@entities/error/error.entity';
import { AxiosError } from 'axios';
import handleHttpError from './handle-http-errors';
import { setError } from '@store/error';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { SentFrom } from '../../entities/cart/cart.request';

const dispatchHttpErrors = (
  error: AxiosError,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  action: CartAction,
  sentFrom: SentFrom,
) => {
  const errorData = error?.response?.data as ResponseError;
  if (errorData) {
    const cartError = handleHttpError(errorData, action, sentFrom);
    if (cartError) dispatch(setError(cartError));
  }
};

export default dispatchHttpErrors;
