import Image from 'next/image';
import {
  Container,
  Title,
  IconContainer,
  PriceContainer,
  InfoContainer,
} from './styles';
import { formattedCLP } from '../../../../../utils/helpers';
import useProductServices from '@hooks/useProductServices';
import { ProductServiceProps } from './types';

const ProductService = ({ option }: ProductServiceProps) => {
  const { mapServicetype } = useProductServices();
  const { description, price } = option;

  const serviceType = mapServicetype(description);

  return (
    <Container>
      <IconContainer>
        <Image
          src={serviceType.icon}
          width={32}
          height={32}
          alt={`icon-${description}`}
        />
      </IconContainer>
      <InfoContainer>
        <Title>{serviceType.title}</Title>
        <PriceContainer>{formattedCLP(price)}</PriceContainer>
      </InfoContainer>
    </Container>
  );
};

export default ProductService;
