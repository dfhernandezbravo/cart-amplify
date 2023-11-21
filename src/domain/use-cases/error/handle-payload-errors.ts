import {
  AppError,
  CartAction,
  MessagesError,
} from '@entities/error/error.entity';

const handlePayloadError = (
  error: MessagesError,
  action: CartAction,
): AppError => {
  switch (error.status) {
    case 'error':
      return {
        error: 'Error',
        message: `Error al ${action} producto`,
      };

    default:
      return {
        error: 'Error',
        message: `Error al ${action} producto`,
      };
  }
};

export default handlePayloadError;
