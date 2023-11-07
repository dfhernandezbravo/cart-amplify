import { useAppSelector } from '@hooks/storeHooks';
import { Container, Title } from './styles';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';
import Image from 'next/image';
import calculateTotalWithoutShippingPrice from '@utils/calculateTotalWithoutShippingPrice';
import { PriceType, Totals } from '@entities/cart/cart.entity';

const TotalCencopayPrice = () => {
  const { cartBFF, loading, isCencopayActive } = useAppSelector(
    (state) => state.cart,
  );

  if (!cartBFF?.totals?.totalCencoPay || !isCencopayActive) return null;

  const valueWithoutShipping = calculateTotalWithoutShippingPrice(
    cartBFF?.totals as Totals,
    PriceType.totalCencoPay,
  );
  const value = formattedCLP(valueWithoutShipping);

  return (
    <Container>
      <div className="cencopay-total-container">
        <Title>Subtotal con tarjeta Cencopay</Title>
        <Image
          src="/icons/cart/cencopay-icon.svg"
          width={41}
          height={41}
          alt="cencopay-icon"
        />
      </div>
      {loading ? <Skeleton /> : <span className="value-price">{value}</span>}
    </Container>
  );
};

export default TotalCencopayPrice;
