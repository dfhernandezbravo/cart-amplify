import React from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { MessageContainer } from './styles';

const toastTypes = ['info', 'success', 'warning', 'error'];

const ToastMessage = ({ title, description }: Messages) => {
  return (
    <MessageContainer>
      <p>
        <strong>{title ?? ''}</strong>
      </p>
      <p>{description ?? ''}</p>
    </MessageContainer>
  );
};


const selectLayout = (type: TypesProps, position: PositionType = 'bottom-right' ) => {

  switch (type) {
    case 'success':
      return {
        position,
        icon: () => (
          <Image src='/icons/cart/success-icon.svg' alt='sucess-icon' width={25} height={25} />
        ),
        style: {
          background: '#2f767b',
          color: '#ffffff'
        }
      }
    case 'info':
      return {
        position,
        icon: () => (
          <Image src='/icons/cart/info-icon.svg' alt='info-icon' width={25} height={25}/>
        ),
        style: {
          background: '#148b8',
          color: '#ffffff'
        }
      }
    case 'warning':
      return {
        position,
        icon: () => (
          <Image src='/icons/cart/warning-icon.svg' alt='warning-icon' width={25} height={25}/>
        ),
        style: {
          background: '#c54b15',
          color: '#ffffff'
        }
      }
    case 'error':
      return {
        position,
        icon: () => (
          <Image src='/icons/cart/error-icon.svg' alt='error-icon' width={25} height={25}/>
        ),
        style: {
          background: '#70110e',
          color: '#ffffff'
        }
      }
      default:
        return {}
  }
}




const showToast = ({
  title,
  description,
  type = 'default',
  position = 'bottom-right'
} : ToastProps) => {

  if (type === 'default') {
    return toast(<ToastMessage title={title} description={description} />, { position });
  }

  const layout = selectLayout(type, position)

  if (toastTypes.includes(type)) {
    return toast[type](
      <ToastMessage title={title} description={description} />, layout);
  }
};

export default showToast;
