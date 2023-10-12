import { useAppSelector } from '@hooks/storeHooks';
import { formattedCLP } from '@utils/helpers';
import { TotalPriceCencosudProps } from './types';
import { Container, Title, Skeleton } from './styles';

const TotalPriceCencosud = (props: TotalPriceCencosudProps) => {
  // hooks
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  // props
  const { className } = props;

  return (
    <Container className={className}>
      <Title>Total con tarjeta Cencosud</Title>
      {loading ? (
        <Skeleton />
      ) : (
        <span>{formattedCLP(cartBFF?.totals?.totalCardPrice ?? 0)}</span>
      )}
    </Container>
  );
};

export default TotalPriceCencosud;
