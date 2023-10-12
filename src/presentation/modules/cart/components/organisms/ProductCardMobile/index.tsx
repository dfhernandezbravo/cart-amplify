import { useState } from 'react';

//Styles
import ProductImage from '@components/molecules/ProductImage';
import { ProductCardProps } from '../ProductCard/types';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import ProductPrice from '@components/molecules/ProductPrice';
import QuantitySelector from '@components/atoms/QuantitySelector';

//Styles
import {
  Container,
  ImageContainer,
  QuantitySelectorAndDeleteContainer,
} from './styles';
import DeleteButton from '@components/molecules/DeleteButton';
import Modal from '@components/atoms/Modal';
import { QuantitySelectorContainer } from '../ProductCard/styles';
import AvailableQuantity from '../ProductCard/components/AvailableQuantity';

const ProductCardMobile = (props: ProductCardProps) => {
  const { item, onRemoveFromCart, handleChangeQuantity, itemStockModify } =
    props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityValue, setQuantityValue] = useState('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectedQuantity = (quantity: string) => {
    if (quantity === '6 +') {
      return setIsModalOpen(true);
    }
    handleChangeQuantity(quantity);
  };

  const handleOnClickQuantity = () => {
    handleSelectedQuantity(quantityValue);
    setQuantityValue('');
    setIsModalOpen(false);
  };

  if (item.product.availability !== 'available') return null;
  return (
    <>
      <Container>
        <ImageContainer>
          <ProductImage src={item?.product?.images} alt={item.product?.brand} />
        </ImageContainer>
        <div>
          <ProductBrand brand={item?.product?.brand} />
          <ProductName productName={item?.product?.description} />
          <div>
            <ProductPrice
              offerPrice={item?.product?.prices?.offerPrice}
              normalPrice={item?.product?.prices?.normalPrice}
              quantity={item?.quantity ?? 0}
            />
          </div>
          <QuantitySelectorAndDeleteContainer>
            <QuantitySelector
              quantitySelected={(value: string) =>
                handleSelectedQuantity(value)
              }
              quantity={item?.quantity}
            />
            <DeleteButton hasIcon={true} onRemoveFromCart={onRemoveFromCart} />
          </QuantitySelectorAndDeleteContainer>
          {itemStockModify && (
            <AvailableQuantity quantity={itemStockModify as number} />
          )}
        </div>
      </Container>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <QuantitySelectorContainer>
          <p>Elige cantidad</p>
          <input
            type="number"
            value={quantityValue}
            placeholder="Ingresa la cantidad"
            onChange={(value) => setQuantityValue(value.target.value)}
          />
          <button onClick={() => handleOnClickQuantity()}>Aplicar</button>
        </QuantitySelectorContainer>
      </Modal>
    </>
  );
};

export default ProductCardMobile;
