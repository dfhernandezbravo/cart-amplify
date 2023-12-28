import Image from 'next/image';
import { Container } from './styles';

const WarningProductWithoutStock = () => {
  return (
    <Container>
      <Image
        src="/icons/cart/warning-orange.svg"
        width={24}
        height={24}
        alt="warning-icon"
      />
      <div className="text-container">
        <p className="title">Producttos sin stock disponibles</p>
        <span className="description">
          El valor de estos productos no está incluido.
        </span>
      </div>
    </Container>
  );
};

export default WarningProductWithoutStock;
