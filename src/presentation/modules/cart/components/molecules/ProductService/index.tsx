import { useState } from 'react';
import Image from 'next/image';
import Checkbox from '@components/atoms/Checkbox';
import ProductServiceModal from './ProductServiceModal';
import {
  Container,
  MainContainer,
  Title,
  ModalLink,
  PriceContainer,
  IconContainer,
} from './styles';
import useProductServices from '@hooks/useProductServices';
import { formattedCLP } from '@utils/helpers';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import addProductService from '@use-cases/cart/add-product-service';
import { ProductServiceProps } from './types';
import deleteProductService from '@use-cases/cart/delete-product-service';

const ProductService = ({ option, index }: ProductServiceProps) => {
  const { mapServicetype } = useProductServices();
  const dispatch = useAppDispatch();
  const { cartId } = useAppSelector((state) => state.cart);

  const [checked, setChecked] = useState(option.isApplied);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { description, price, id } = option;

  const serviceType = mapServicetype(description);

  const handleChange = async () => {
    const updateChecked = !checked;
    setChecked(updateChecked);

    if (updateChecked) {
      await dispatch(addProductService({ cartId, id, itemIndex: index }));
    } else {
      await dispatch(
        deleteProductService({ cartId, itemIndex: index, optionId: id }),
      );
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

export default ProductService;
