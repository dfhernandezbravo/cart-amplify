import {
  genericPayloadError,
  httpOrPayloadError,
} from '@components/atoms/ToastContainer/customMessage';
import { MessagesError, ProductAvailability } from '@entities/cart/cart.entity';
import { AppError } from '@entities/error/error.entity';

const ERROR_PAYLOAD_CONTENT = 'Lo sentimos, no pudimos completar la acción.';
const WARNING_PAYLOAD_TITLE = 'Hubo un cambio en tus productos';

const handlePayloadError = (errors: MessagesError[]): AppError | null => {
  const errorsMessages = errors.filter(
    (error) =>
      error.status === 'error' &&
      error.code !== ProductAvailability.CANNOTBEDELIVERED,
  );
  const warningMessages = errors.filter((error) => error.status === 'warning');

  console.log({ errorsMessages, warningMessages });

  if (errorsMessages.length) {
    genericPayloadError(); // cart toast

    return {
      errorType: 'payload',
      status: 'error',
      content: ERROR_PAYLOAD_CONTENT,
    };
  }

  if (warningMessages.length) {
    httpOrPayloadError({
      title: WARNING_PAYLOAD_TITLE,
      content: warningMessages[0].text,
      status: 'warning',
      type: 'payload',
    }); // cart toast

    return {
      errorType: 'payload',
      status: 'warning',
      title: WARNING_PAYLOAD_TITLE,
      content: `${warningMessages[0].text}`,
      ean:
        warningMessages[0].code ===
        ProductAvailability.ITEM_QUANTITY_NOT_AVAILABLE
          ? `${warningMessages[0].fields?.ean}`
          : undefined,
    };
  }

  return null;
};

export default handlePayloadError;
