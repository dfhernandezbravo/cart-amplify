import { useState } from 'react';
import ProductImage from '@components/molecules/ProductImage';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import ProductPrice from '@components/molecules/ProductPrice';
import ProductSku from '@components/molecules/ProductSku';
import DeleteButton from '@components/molecules/DeleteButton';
import QuantitySelector from '@components/atoms/CartQuantitySelector';
import AvailableQuantity from './components/AvailableQuantity';
import { ProductCardProps } from './types';
import {
  Container,
  ProductInfoContainer,
  ProductInfoAndPriceContainer,
  QuantitySelectorAndDeleteContainer,
  ImageContainer,
  PriceContainer,
  BrandProductNameContainer,
} from './styles';
import useAnalytics from '@hooks/useAnalytics';
import { AnalyticsEvents } from '@entities/analytics';
import ModalQuantity from '../ModalQuantity';
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
          name: item?.product?.description,
          id: item?.product?.sku,
          price: item?.product?.prices?.normalPrice?.toString(),
          price_tecno: item?.product?.prices?.brandPrice?.toString(),
          brand: item?.product?.brand,
          category: item?.product?.category,
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
          name: item?.product?.description,
          id: item?.product?.sku,
          price: item?.product?.prices?.normalPrice?.toString(),
          price_tecno: item?.product?.prices?.brandPrice?.toString(),
          brand: item?.product?.brand,
          category: item?.product?.category,
          variant: '',
          quantity: item?.quantity,
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
              <BrandProductNameContainer>
                <ProductBrand brand={item?.product?.brand} />
                <ProductName
                  productName={item?.product?.description}
                  productUrl={item?.product?.detailUrl}
                />
                <ProductSku id={item?.product.sku} />
              </BrandProductNameContainer>
            </ProductInfoContainer>
            <PriceContainer>
              <div>
                <ProductPrice
                  prices={item?.product.prices}
                  quantity={item?.quantity ?? 0}
                  adjustment={item?.adjustment}
                />
              </div>
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
            </PriceContainer>
          </ProductInfoAndPriceContainer>
        </>
        {/* {hasServices?.length
          ? hasServices.map((obj) => (
              <ProductService key={obj.id} option={obj} index={index} />
            ))
          : null} */}
      </Container>

      <ModalQuantity
        quantityValue={quantityValue}
        isModalOpen={isModalOpen}
        handleQuantityValue={(value) => setQuantityValue(value)}
        handleCloseModal={handleCloseModal}
        handleOnClick={handleOnClickQuantity}
      />
    </>
  );
};

export default ProductCard;
