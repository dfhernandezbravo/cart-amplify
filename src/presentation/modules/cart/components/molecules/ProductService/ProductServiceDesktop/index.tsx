import Image from 'next/image';
import Checkbox from '@components/atoms/Checkbox';
import {
  Container,
  MainContainer,
  Title,
  ModalLink,
  PriceContainer,
  IconContainer,
} from './styles';
import { ProductServiceDeviceProps } from '../types';
import { formattedCLP } from '@utils/helpers';
import ProductServiceModal from '../ProductServiceModal';

const ProductServiceDesktop = (props: ProductServiceDeviceProps) => {
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
          <Checkbox value={checked} onChange={handleChange} />
          <IconContainer>
            <Image
              src={serviceType.icon}
              width={32}
              height={32}
              alt={`icon-${description}`}
            />
          </IconContainer>
          <div>
            <Title>{serviceType.title}</Title>
            <ModalLink onClick={handleOpenModal}>¿En qué consiste?</ModalLink>
          </div>
        </MainContainer>
        <PriceContainer>
          <span>{formattedCLP(price)}</span>
        </PriceContainer>
      </Container>

      <ProductServiceModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default ProductServiceDesktop;
