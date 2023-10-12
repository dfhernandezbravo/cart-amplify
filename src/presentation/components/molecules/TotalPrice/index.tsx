import { useAppSelector } from '@hooks/storeHooks';
import { formattedCLP } from '@utils/helpers';
import { Container, Title } from './styles';
import { TotalPriceProps } from './types';

const TotalPrice = (props: TotalPriceProps) => {
  // hooks
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  // props
  const { className } = props;

  return (
    <Container className={className}>
      <Title>Total con otros medios de pago</Title>
      {loading ? (
        <span className="skeleton"></span>
      ) : (
        <span>{formattedCLP(cartBFF?.totals?.totalPrice ?? 0)}</span>
      )}
    </Container>
  );
};

export default TotalPrice;
