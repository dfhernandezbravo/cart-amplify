import React from 'react';
import ProductImage from '@components/molecules/ProductImage';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import { Item, ProductAvailability } from '@entities/cart/cart.entity';
import DeleteButton from '@components/molecules/DeleteButton';
import useProductCardEvent from '@hooks/useProductCardEvent';
import { useAppSelector } from '@hooks/storeHooks';
import WarningProductWithoutStock from '@components/atoms/WarningProductWithoutStock';
import {
  ProductInfoContainer,
  ProductInfoAndPriceContainer,
  ImageContainer,
  ButtonContainer,
  ProductUnavailableContainer,
  BrandProductNameContainer,
} from '../../../../styles';

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
        return (
          <>
            <ProductUnavailableContainer key={index}>
              <ProductInfoAndPriceContainer>
                <ProductInfoContainer>
                  <ImageContainer>
                    <ProductImage
                      src={item?.product?.images}
                      alt={''}
                      width={60}
                      height={60}
                    />
                  </ImageContainer>
                  <BrandProductNameContainer>
                    <ProductBrand brand={item?.product?.brand} />
                    <ProductName
                      productName={item?.product?.description}
                      productUrl={item?.product?.detailUrl}
                    />
                  </BrandProductNameContainer>
                </ProductInfoContainer>
                <ButtonContainer>
                  <DeleteButton
                    hasIcon={true}
                    onRemoveFromCart={() =>
                      handleRemoveFromCart(item.index as number)
                    }
                  />
                </ButtonContainer>
              </ProductInfoAndPriceContainer>
            </ProductUnavailableContainer>
          </>
        );
      })}
    </>
  );
};

export default ProductCardUnavailable;
