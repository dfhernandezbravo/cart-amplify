import useBreakpoints from '@hooks/useBreakpoints';
import { Container, Text } from './styles';
import Image from 'next/image';

const ShippingCostMessage = () => {
  const { device } = useBreakpoints();
  return (
    <Container isMobile={device === 'Phone'}>
      {device !== 'Phone' && (
        <Image
          src="/icons/cart/truck.svg"
          width={24}
          height={24}
          alt="icon-truck"
          priority
        />
      )}
      <Text isMobile={device === 'Phone'}>
        El costo de envío se calculará en el siguiente paso
      </Text>
    </Container>
  );
};

export default ShippingCostMessage;
