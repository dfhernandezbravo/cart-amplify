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
      <Image
        src="/icons/cart/warning-orange.svg"
        width={24}
        height={24}
        alt="warning-icon"
        priority
      />
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
