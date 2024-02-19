import Image from 'next/image';
import Checkbox from '@components/atoms/Checkbox';
import {
  Container,
  MainContainer,
  Title,
  ModalLink,
  IconContainer,
  InfoContainer,
  PriceContainer,
} from './styles';
import { ProductServiceDeviceProps } from '../types';
import { formattedCLP } from '@utils/helpers';
import ProductServiceModal from '@components/molecules/ProductServiceModal';

const ProductServiceMobile = (props: ProductServiceDeviceProps) => {
  const {
    checked,
    description,
    isModalOpen,
    price,
    serviceType,
    handleChange,
    handleCloseModal,
    handleOpenModal,
  } = props;
  return (
    <>
      <Container>
        <MainContainer>
          <IconContainer>
            <Image
              src={serviceType.icon}
              width={32}
              height={32}
              alt={`icon-${description}`}
              priority
            />
          </IconContainer>
          <InfoContainer>
            <Title>{serviceType.title}</Title>
            <PriceContainer>{formattedCLP(price)}</PriceContainer>
            <ModalLink onClick={handleOpenModal}>¿En qué consiste?</ModalLink>
          </InfoContainer>
        </MainContainer>
        <Checkbox value={checked} onChange={handleChange} />
      </Container>

      <ProductServiceModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default ProductServiceMobile;
