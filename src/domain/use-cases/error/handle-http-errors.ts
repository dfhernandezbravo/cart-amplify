import {
  AppError,
  CartAction,
  ResponseError,
} from '@entities/error/error.entity';

const handleHttpError = (
  error: ResponseError,
  action: CartAction,
): AppError => {
  switch (error.statusCode) {
    case 400:
      return {
        error: 'HttpException',
        message: `Error al ${action} producto`,
      };

    default:
      return {
        error: 'InternalServerError',
        message: `Error al ${action} producto`,
      };
  }
};

export default handleHttpError;
