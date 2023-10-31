import { useAppSelector } from '@hooks/storeHooks';
import { Container, Title } from './styles';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';
import Image from 'next/image';
import { TotalCencoPayProps } from './types';

const TotalCencopayPrice = (props: TotalCencoPayProps) => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  if (!cartBFF?.totals?.totalCencoPay) return null;

  const { cartAside } = props;

  const calculateTotalWithoutShippingPrice = () => {
    const totalCencoPayPrice = cartBFF?.totals?.totalCencoPay ?? 0;
    const shippingPrice = cartBFF?.totals?.shippingPrice ?? 0;
    return totalCencoPayPrice - shippingPrice;
  };

  return (
    <Container>
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
          {cartAside
            ? formattedCLP(calculateTotalWithoutShippingPrice())
            : formattedCLP(cartBFF?.totals?.totalCencoPay)}
        </span>
      )}
    </Container>
  );
};

export default TotalCencopayPrice;
