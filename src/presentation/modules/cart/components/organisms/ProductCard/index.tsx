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
import useAnalytics from '@hooks/useAnalytics';
import { AnalyticsEvents } from '@entities/analytics';
// import ProductService from '@modules/cart/components/molecules/ProductService';

const ProductCard = (props: ProductCardProps) => {
  const {
    item,
    onRemoveFromCart,
    handleChangeQuantity,
    itemStockModify,
    index,
    itemLength,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityValue, setQuantityValue] = useState('');

  // const hasServices = item.product.options;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const {
    methods: { sendQuantityClickEvent, sendRemoveFromCart },
  } = useAnalytics();

  const eventName = (
    newQuantity: string,
    oldQuantity: number,
  ): AnalyticsEvents => {
    return parseInt(newQuantity) > oldQuantity ? 'addToCart' : 'removeFromCart';
  };

  const handleSelectedQuantity = (quantity: string) => {
    if (quantity === '6 +') {
      return setIsModalOpen(true);
    }
    handleChangeQuantity(quantity);

    const productData = {
      products: [
        {
          name: item.product.description,
          id: item.product.sku,
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
          id: item.product.sku,
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
      <Container isLastItem={itemLength === index + 1}>
        <>
          <ProductInfoAndPriceContainer>
            <ProductInfoContainer>
              <ImageContainer>
                <ProductImage src={item?.product?.images} alt={''} />
              </ImageContainer>
              <div>
                <ProductBrand brand={item?.product?.brand} />
                <ProductName
                  productName={item?.product?.description}
                  productUrl={item?.product?.detailUrl}
                />
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
              <DeleteButton
                hasIcon={true}
                onRemoveFromCart={handleRemoveFromCart}
              />
            </div>
          </QuantitySelectorAndDeleteContainer>
        </>
        {/* {hasServices?.length
          ? hasServices.map((obj) => (
              <ProductService key={obj.id} option={obj} index={index} />
            ))
          : null} */}
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
