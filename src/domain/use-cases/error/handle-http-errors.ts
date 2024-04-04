import { httpOrPayloadError } from '@components/atoms/ToastContainer/customMessage';
import { SentFrom } from '@entities/cart/cart.request';
import {
  AppError,
  CartAction,
  ResponseError,
} from '@entities/error/error.entity';

const ERROR_HTTP_CONTENT = 'Intenta nuevamente';

const handleHttpError = (
  error: ResponseError,
  action: CartAction,
  sentFrom: SentFrom,
): AppError | null => {
  if (sentFrom === 'CART') {
    httpOrPayloadError({
      title: `Error al ${action} producto`,
      content: ERROR_HTTP_CONTENT,
      status: 'error',
      type: 'http',
    });
    return null;
  }

  return {
    errorType: 'http',
    status: 'error',
    title: `Error al ${action} producto`,
    content: ERROR_HTTP_CONTENT,
  };
};

export default handleHttpError;
