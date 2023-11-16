import { CartAction, ResponseError } from '@entities/error/error.entity';
import { AxiosError } from 'axios';
import handleHttpError from './handle-http-errors';
import { setError } from '@store/error';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const dispatchHttpErrors = (
  error: AxiosError,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  action: CartAction,
) => {
  const errorData = error?.response?.data as ResponseError;
  if (errorData) {
    const cartError = handleHttpError(errorData, action);
    dispatch(setError(cartError));
  }
};

export default dispatchHttpErrors;
