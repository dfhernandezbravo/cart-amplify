import { useAppSelector } from '@hooks/storeHooks';
import { formattedCLP } from '@utils/helpers';
import { Container, Title } from './styles';
import { TotalPriceProps } from './types';
import { Skeleton } from '../TotalPriceCencosud/styles';
import calculateTotalWithoutShippingPrice from '@utils/calculateTotalWithoutShippingPrice';
import { PriceType, Totals } from '@entities/cart/cart.entity';

const TotalPrice = (props: TotalPriceProps) => {
  // hooks
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  // props
  const { className } = props;

  const valueWithoutShipping = calculateTotalWithoutShippingPrice(
    cartBFF?.totals as Totals,
    PriceType.totalPrice,
  );
  const value = formattedCLP(valueWithoutShipping);

  return (
    <Container className={className}>
      <Title>Subtotal con otros medios de pago</Title>
      {loading ? <Skeleton /> : <span className="totalPrice">{value}</span>}
    </Container>
  );
};

export default TotalPrice;
