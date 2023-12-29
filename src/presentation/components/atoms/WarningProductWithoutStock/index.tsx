import Image from 'next/image';
import { Container } from './styles';
import { ProductAvailability } from '@entities/cart/cart.entity';

interface Props {
  messageType:
    | ProductAvailability.CANNOTBEDELIVERED
    | ProductAvailability.WITHOUTSTOCK;
}

const WarningProductWithoutStock = ({ messageType }: Props) => {
  const textMessage = {
    [ProductAvailability.CANNOTBEDELIVERED]: {
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
