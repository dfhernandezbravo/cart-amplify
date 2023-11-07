import Image from 'next/image';
import { useAppSelector } from '@hooks/storeHooks';
import { formattedCLP } from '@utils/helpers';
import { TotalPriceCencosudProps } from './types';
import { Container, Title, Skeleton } from './styles';
import calculateTotalWithoutShippingPrice from '@utils/calculateTotalWithoutShippingPrice';
import { PriceType, Totals } from '@entities/cart/cart.entity';

const TotalPriceCencosud = (props: TotalPriceCencosudProps) => {
  // hooks
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  // props
  const { className } = props;

  const valueWithoutShipping = calculateTotalWithoutShippingPrice(
    cartBFF?.totals as Totals,
    PriceType.totalCardPrice,
  );
  const value = formattedCLP(valueWithoutShipping);

  return (
    <Container className={className}>
      <div className="title-container">
        <Title>Subtotal con tarjeta Cencosud</Title>
        <Image
          src={'/icons/cart/tc-cencosud.svg'}
          width={41}
          height={41}
          alt="cencosud-icon"
        />
      </div>
      {loading ? <Skeleton /> : <span className="totalPrice">{value}</span>}
    </Container>
  );
};

export default TotalPriceCencosud;
