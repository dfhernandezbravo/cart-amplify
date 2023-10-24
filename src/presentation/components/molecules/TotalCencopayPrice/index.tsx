import { useAppSelector } from '@hooks/storeHooks';
import { Container, Title } from './styles';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';
import Image from 'next/image';

const TotalCencopayPrice = () => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  return (
    <Container>
      {cartBFF?.totals?.totalCencoPay ? (
        <>
          <div className="cencopay-total-container">
            <Title>Total con tarjeta Cencopay</Title>
            <Image
              src="/icons/cart/cencopay-icon.svg"
              width={30}
              height={30}
              alt="cencopay-icon"
            />
          </div>
          {loading ? (
            <Skeleton />
          ) : (
            <span className="value-price">
              {formattedCLP(cartBFF?.totals?.totalCencoPay)}
            </span>
          )}
        </>
      ) : null}
    </Container>
  );
};

export default TotalCencopayPrice;
