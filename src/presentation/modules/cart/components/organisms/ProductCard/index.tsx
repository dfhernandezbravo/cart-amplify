import { useState } from 'react';

import ProductImage from '@components/molecules/ProductImage';

import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import ProductPrice from '@components/molecules/ProductPrice';
import DeleteButton from '@components/molecules/DeleteButton';
import QuantitySelector from '@components/atoms/CartQuantitySelector';
import ProductSku from '@components/molecules/ProductSku';
import AvailableQuantity from './components/AvailableQuantity';
import Modal from '@components/atoms/Modal';
import { ProductCardProps } from './types';
import {
  Container,
  ProductInfoContainer,
  ProductInfoAndPriceContainer,
  QuantitySelectorAndDeleteContainer,
  ImageContainer,
  QuantitySelectorContainer,
} from './styles';

const ProductCard = (props: ProductCardProps) => {
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
        <ProductInfoAndPriceContainer>
          <ProductInfoContainer>
            <ImageContainer>
              <ProductImage src={item?.product?.images} alt={''} />
            </ImageContainer>
            <div>
              <ProductBrand brand={item?.product?.brand} />
              <ProductName productName={item?.product?.description} />
              <ProductSku id={item?.product.sku} />
            </div>
          </ProductInfoContainer>
          <div>
            <ProductPrice
              prices={item?.product.prices}
              quantity={item?.quantity ?? 0}
              adjustment={item?.adjustment}
            />
          </div>
        </ProductInfoAndPriceContainer>

        <QuantitySelectorAndDeleteContainer>
          {itemStockModify && (
            <AvailableQuantity quantity={itemStockModify as number} />
          )}
          <div className="quantity-container">
            <QuantitySelector
              quantitySelected={(value: string) =>
                handleSelectedQuantity(value)
              }
              quantity={item?.quantity}
            />
            <DeleteButton hasIcon={true} onRemoveFromCart={onRemoveFromCart} />
          </div>
        </QuantitySelectorAndDeleteContainer>
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

export default ProductCard;
