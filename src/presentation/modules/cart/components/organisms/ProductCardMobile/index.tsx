import { useState } from 'react';
import ProductImage from '@components/molecules/ProductImage';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import ProductPrice from '@components/molecules/ProductPrice';
import QuantitySelector from '@components/atoms/CartQuantitySelector';
import ModalQuantity from '../ModalQuantity';
import { ProductCardProps } from '../ProductCard/types';
//Styles
import {
  Container,
  ImageContainer,
  QuantitySelectorAndDeleteContainer,
  MainContainer,
} from './styles';
import DeleteButton from '@components/molecules/DeleteButton';
import AvailableQuantity from '../ProductCard/components/AvailableQuantity';
import ProductSku from '@components/molecules/ProductSku';
import useAnalytics from '@hooks/useAnalytics';
import { AnalyticsEvents } from '@entities/analytics';
import TintometricColors from '../TintometricColors';
// import ProductService from '@modules/cart/components/molecules/ProductService';

const ProductCardMobile = (props: ProductCardProps) => {
  const {
    item,
    onRemoveFromCart,
    handleChangeQuantity,
    itemStockModify,
    index,
    itemLength,
  } = props;

  const {
    methods: { sendQuantityClickEvent, sendRemoveFromCart },
  } = useAnalytics();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityValue, setQuantityValue] = useState('');

  // const hasServices = item.product.options;

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

  const hasTintometric = item.product.colorCodes
    ? item.product.colorCodes.length > 0
    : false;

  if (item.product.availability !== 'available') return null;
  return (
    <>
      <Container isLastItem={itemLength === index + 1}>
        <MainContainer>
          <ImageContainer>
            <ProductImage
              src={item?.product?.images}
              alt={item.product?.brand}
            />
          </ImageContainer>
          <div>
            <ProductBrand brand={item?.product?.brand} />
            <ProductName
              productName={item?.product?.description}
              productUrl={item?.product?.detailUrl}
            />
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
            {!hasTintometric ? (
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
            ) : null}
          </div>
        </MainContainer>
        {/* {hasServices?.length
          ? hasServices.map((obj) => (
              <ProductService key={obj.id} option={obj} index={index} />
            ))
          : null} */}
        <TintometricColors item={item} index={index} />
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

export default ProductCardMobile;
