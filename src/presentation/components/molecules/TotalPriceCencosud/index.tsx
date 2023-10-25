import Image from 'next/image';
import { useAppSelector } from '@hooks/storeHooks';
import { formattedCLP } from '@utils/helpers';
import { TotalPriceCencosudProps } from './types';
import { Container, Title, Skeleton } from './styles';

const TotalPriceCencosud = (props: TotalPriceCencosudProps) => {
  // hooks
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  // props
  const { className, cartAside } = props;

  const calculateTotalWithoutShippingPrice = () => {
    const totalCardPrice = cartBFF?.totals?.totalCardPrice ?? 0;
    const shippingPrice = cartBFF?.totals?.shippingPrice ?? 0;
    return totalCardPrice - shippingPrice;
  };

  return (
    <Container className={className}>
      <div className="title-container">
        <Title>Total con tarjeta Cencosud</Title>
        <Image
          src={'/icons/cart/tc-cencosud.svg'}
          width={26}
          height={26}
          alt="cencosud-icon"
        />
      </div>
      {loading ? (
        <Skeleton />
      ) : (
        <span className="totalPrice">
          {cartAside
            ? formattedCLP(calculateTotalWithoutShippingPrice())
            : formattedCLP(cartBFF?.totals?.totalCardPrice ?? 0)}
        </span>
      )}
    </Container>
  );
};

export default TotalPriceCencosud;
