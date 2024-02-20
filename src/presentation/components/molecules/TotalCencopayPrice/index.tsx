import { useAppSelector } from '@hooks/storeHooks';
import { Container, Title } from './styles';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';
import Image from 'next/image';
import calculateTotalWithoutShippingPrice from '@utils/calculateTotalWithoutShippingPrice';
import { PriceType, Totals } from '@entities/cart/cart.entity';

interface Props {
  className?: string;
}

const TotalCencopayPrice = (props: Props) => {
  const { className } = props;
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
    <Container className={`${className}`}>
      <div className={`cencopay-total-container`}>
        <Title className="title">Subtotal con CencoPay</Title>
        <Image
          src="/icons/cart/cencopay-icon.svg"
          width={30}
          height={30}
          alt="cencopay-icon"
        />
      </div>
      {loading ||
      !cartBFF?.totals?.totalCencoPay ||
      cartBFF?.totals?.totalCencoPay === -1 ? (
        <Skeleton />
      ) : (
        <span className="value-price">{value}</span>
      )}
    </Container>
  );
};

export default TotalCencopayPrice;
