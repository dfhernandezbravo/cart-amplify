import Image from 'next/image';
import { StateProps } from './HeaderAsideMobile.types';
import { Container } from './styles';

const HeaderAsideMobile = ({ openDetails, setOpenDetails }: StateProps) => {
  return (
    <Container onClick={() => setOpenDetails(!openDetails)}>
      <div>
        <Image
          src="/icons/cart/cart.svg"
          alt="carrito"
          width={20}
          height={20}
          priority
        />
        <p>Resumen de compra</p>
      </div>
      <div>
        <button className="toggle-detail-btn">
          {!openDetails ? 'Revisar' : 'Ocultar'}
        </button>
      </div>
    </Container>
  );
};

export default HeaderAsideMobile;
