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

const selectLayout = (
  type: TypesProps,
  position: PositionType = 'bottom-right',
) => {
  switch (type) {
    case 'success':
      return {
        position,
        icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM9.003 14L4.76 9.757L6.174 8.343L9.003 11.172L14.659 5.515L16.074 6.929L9.003 14Z"
              fill="white"
            />
          </svg>
        ),
        style: {
          background: '#2f767b',
          color: '#ffffff',
        },
      };
    case 'info':
      return {
        position,
        icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM9 5H11V7H9V5ZM9 9H11V15H9V9Z"
              fill="white"
            />
          </svg>
        ),
        style: {
          background: '#147ab8',
          color: '#ffffff',
        },
      };
    case 'warning':
      return {
        position,
        icon: () => (
          <Image
            src="/icons/cart/warning-icon.svg"
            alt="warning-icon"
            width={25}
            height={25}
            priority
          />
        ),
        style: {
          background: '#c54b15',
          color: '#ffffff',
        },
      };
    case 'error':
      return {
        position,
        icon: () => (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM9 13H11V15H9V13ZM9 5H11V11H9V5Z"
              fill="white"
            />
          </svg>
        ),
        style: {
          background: '#70110e',
          color: '#ffffff',
        },
      };
    default:
      return {};
  }
};

const showToast = ({
  title,
  description,
  type = 'default',
  position = 'top-right',
}: ToastProps) => {
  if (type === 'default') {
    return toast(<ToastMessage title={title} description={description} />, {
      position,
    });
  }

  const layout = selectLayout(type, position);

  if (toastTypes.includes(type)) {
    return toast[type](
      <ToastMessage title={title} description={description} />,
      layout,
    );
  }
};

export default showToast;
