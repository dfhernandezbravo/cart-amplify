import { httpOrPayloadError } from '@components/atoms/ToastContainer/customMessage';
import {
  AppError,
  CartAction,
  ResponseError,
} from '@entities/error/error.entity';

const ERROR_HTTP_CONTENT = 'Intenta nuevamente';

const handleHttpError = (
  error: ResponseError,
  action: CartAction,
): AppError => {
  switch (error.statusCode) {
    case 400:
      httpOrPayloadError({
        title: `Error al ${action} producto`,
        content: ERROR_HTTP_CONTENT,
        status: 'error',
        type: 'http',
      }); // cart toast
      return {
        errorType: 'http',
        status: 'error',
        title: `Error al ${action} producto`,
        content: ERROR_HTTP_CONTENT,
      };

    default:
      httpOrPayloadError({
        title: `Error al ${action} producto`,
        content: ERROR_HTTP_CONTENT,
        status: 'error',
        type: 'http',
      }); // cart toast
      return {
        errorType: 'http',
        status: 'error',
        title: `Error al ${action} producto`,
        content: ERROR_HTTP_CONTENT,
      };
  }
};

export default handleHttpError;
