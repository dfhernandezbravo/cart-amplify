import { StatusError, ErrorType } from '@entities/error/error.entity';
import showToast from './ToastMessage';

type Props = {
  position?: PositionType;
};

type ErrorProps = {
  position?: PositionType;
  title: string;
  content: string;
  status: StatusError;
  type: ErrorType;
};

export const valueHasChangeToast = (props?: Props) => {
  const position = props?.position || 'top-right';
  return showToast({
    description: 'Los valores han cambiado.',
    type: 'info',
    position,
  });
};

export const couponNoValidToast = (props?: Props) => {
  const position = props?.position || 'top-right';
  return showToast({
    description: 'cupón no valido.',
    type: 'error',
    position,
  });
};

export const changeOfAmount = (props?: Props) => {
  const position = props?.position || 'top-right';
  return showToast({
    title: 'Hubo cambios en tus productos',
    description:
      'Lo sentimos, no contamos con la cantidad de unidades seleccionadas.',
    type: 'warning',
    position,
  });
};

export const genericPayloadError = (props?: Props) => {
  const position = props?.position || 'top-right';
  return showToast({
    description: 'Lo sentimos, no pudimos completar la acción.',
    type: 'error',
    position,
  });
};

export const httpOrPayloadError = (props: ErrorProps) => {
  const position = props?.position || 'top-right';
  return showToast({
    title: props.title,
    description: props.content,
    type:
      props.type === 'http'
        ? 'warning'
        : props.status === 'error'
        ? 'error'
        : 'warning',
    position,
  });
};
