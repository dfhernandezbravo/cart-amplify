import Image from 'next/image';
import { Container } from './styles';
import { ProductAvailability } from '@entities/cart/cart.entity';

type MessageType =
  | ProductAvailability.CANNOTBEDELIVERED
  | ProductAvailability.WITHOUTSTOCK
  | ProductAvailability.UNAVAILABLE_ITEM_FULFILLMENT;

interface Props {
  messageType: MessageType;
}

const WarningProductWithoutStock = ({ messageType }: Props) => {
  const textMessage = {
    [ProductAvailability.CANNOTBEDELIVERED]: {
      title: 'Productos no disponibles para tu ubicación',
    },
    [ProductAvailability.UNAVAILABLE_ITEM_FULFILLMENT]: {
      title: 'Productos no disponibles para tu ubicación',
    },
    [ProductAvailability.WITHOUTSTOCK]: {
      title: 'Productos sin stock disponible',
    },
  };

  return (
    <Container>
      <svg
        width="22"
        height="19"
        viewBox="0 0 22 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.8661 0.999956L21.3921 17.5C21.4799 17.652 21.5261 17.8244 21.5261 18C21.5261 18.1755 21.4799 18.3479 21.3921 18.4999C21.3043 18.652 21.1781 18.7782 21.0261 18.866C20.8741 18.9537 20.7016 19 20.5261 19H1.4741C1.29856 19 1.12612 18.9537 0.974105 18.866C0.822089 18.7782 0.695855 18.652 0.608089 18.4999C0.520324 18.3479 0.47412 18.1755 0.474121 18C0.474122 17.8244 0.520329 17.652 0.608096 17.5L10.1341 0.999956C10.2219 0.847949 10.3481 0.721722 10.5001 0.633962C10.6521 0.546202 10.8246 0.5 11.0001 0.5C11.1756 0.5 11.3481 0.546202 11.5001 0.633962C11.6521 0.721722 11.7783 0.847949 11.8661 0.999956ZM3.2061 17H18.7941L11.0001 3.49996L3.2061 17ZM10.0001 14H12.0001V16H10.0001V14ZM10.0001 6.99996H12.0001V12H10.0001V6.99996Z"
          fill="white"
        />
      </svg>

      <div className="text-container">
        <p className="title">{textMessage[messageType].title}</p>
        <span className="description">
          El valor de estos productos no está incluido.
        </span>
      </div>
    </Container>
  );
};

export default WarningProductWithoutStock;
