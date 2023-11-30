import { useState } from 'react';

//Styles
import ProductImage from '@components/molecules/ProductImage';
import { ProductCardProps } from '../ProductCard/types';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import ProductPrice from '@components/molecules/ProductPrice';
import QuantitySelector from '@components/atoms/CartQuantitySelector';

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
import ProductSku from '@components/molecules/ProductSku';
import useAnalytics from '@hooks/useAnalytics';
import { AnalyticsEvents } from '@entities/analytics';

const ProductCardMobile = (props: ProductCardProps) => {
  const { item, onRemoveFromCart, handleChangeQuantity, itemStockModify } =
    props;

  const {
    methods: { sendQuantityClickEvent, sendRemoveFromCart },
  } = useAnalytics();

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

    const eventName = (
      newQuantity: string,
      oldQuantity: number,
    ): AnalyticsEvents => {
      return parseInt(newQuantity) > oldQuantity
        ? 'addToCart'
        : 'removeFromCart';
    };

    const productData = {
      products: [
        {
          name: item.product.description,
          id: item.itemId,
          price: item.product.prices.normalPrice.toString(),
          price_tecno: item.product.prices.brandPrice?.toString(),
          brand: item.product.brand,
          category: item.product.category,
          variant: '',
          quantity: Math.abs(parseInt(quantity) - item.quantity),
        },
      ],
    };
    sendQuantityClickEvent({
      event: eventName(quantity, item.quantity),
      eventType: 'CH',
      ecommerce: {
        currencyCode: 'CLP',
        add: productData,
      },
    });
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(item);

    const productData = {
      products: [
        {
          name: item.product.description,
          id: item.itemId,
          price: item.product.prices.normalPrice.toString(),
          price_tecno: item.product.prices.brandPrice?.toString(),
          brand: item.product.brand,
          category: item.product.category,
          variant: '',
          quantity: item.quantity,
        },
      ],
    };
    sendRemoveFromCart({
      event: 'removeFromCart',
      eventType: 'CH',
      ecommerce: {
        currencyCode: 'CLP',
        add: productData,
      },
    });
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
          <ProductSku id={item?.product.sku} />
          <div>
            <ProductPrice
              prices={item?.product?.prices}
              quantity={item?.quantity ?? 0}
              adjustment={item?.adjustment}
            />
          </div>
          {itemStockModify && (
            <AvailableQuantity quantity={itemStockModify as number} />
          )}
          <QuantitySelectorAndDeleteContainer>
            <QuantitySelector
              quantitySelected={(value: string) =>
                handleSelectedQuantity(value)
              }
              quantity={item?.quantity}
            />
            <DeleteButton
              hasIcon={true}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </QuantitySelectorAndDeleteContainer>
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
