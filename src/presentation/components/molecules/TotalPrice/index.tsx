import { useAppSelector } from '@hooks/storeHooks';
import { formattedCLP } from '@utils/helpers';
import { Container, Title } from './styles';
import { TotalPriceProps } from './types';
import { Skeleton } from '../TotalPriceCencosud/styles';

const TotalPrice = (props: TotalPriceProps) => {
  // hooks
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  // props
  const { className, cartAside } = props;

  const calculateTotalWithoutShippingPrice = () => {
    const totalPrice = cartBFF?.totals?.totalPrice ?? 0;
    const shippingPrice = cartBFF?.totals?.shippingPrice ?? 0;
    return totalPrice - shippingPrice;
  };

  return (
    <Container className={className}>
      <Title>Total con otros medios de pago</Title>
      {loading ? (
        <Skeleton />
      ) : (
        <span className="totalPrice">
          {cartAside
            ? formattedCLP(calculateTotalWithoutShippingPrice())
            : formattedCLP(cartBFF?.totals?.totalPrice ?? 0)}
        </span>
      )}
    </Container>
  );
};

export default TotalPrice;
