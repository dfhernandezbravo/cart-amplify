import React from 'react';
import {
  Container,
  ProductInfoContainer,
  ProductInfoAndPriceContainer,
  QuantitySelectorAndDeleteContainer,
} from '../../../../styles';
import ProductImage from '@components/molecules/ProductImage';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import { Item, ProductAvailability } from '@entities/cart/cart.entity';
import DeleteButton from '@components/molecules/DeleteButton';
import useProductCardEvent from '@hooks/useProductCardEvent';
import { useAppSelector } from '@hooks/storeHooks';
import WarningProductWithoutStock from '@components/atoms/WarningProductWithoutStock';

const ProductCardUnavailable = ({ items }: { items: Item[] }) => {
  const { cartBFF } = useAppSelector((state) => state.cart);
  const {
    methods: { handleRemoveFromCart },
  } = useProductCardEvent(cartBFF?.id as string);

  const productAvailabilityType = items[0].product.availability as
    | ProductAvailability.CANNOTBEDELIVERED
    | ProductAvailability.WITHOUTSTOCK;

  return (
    <>
      <WarningProductWithoutStock messageType={productAvailabilityType} />
      {items.map((item, index) => {
        const isLastItem = items.length === index + 1;
        return (
          <>
            <Container key={index} isLastItem={isLastItem}>
              <ProductInfoAndPriceContainer>
                <ProductInfoContainer>
                  <ProductImage src={item?.product?.images} alt={''} />
                  <div>
                    <ProductBrand brand={item?.product?.brand} />
                    <ProductName
                      productName={item?.product?.description}
                      productUrl={item?.product?.detailUrl}
                    />
                  </div>
                </ProductInfoContainer>
                <DeleteButton
                  hasIcon={true}
                  onRemoveFromCart={() =>
                    handleRemoveFromCart(item.index as number)
                  }
                />
              </ProductInfoAndPriceContainer>
            </Container>
          </>
        );
      })}
    </>
  );
};

export default ProductCardUnavailable;
