import Image from 'next/image';

import { ProductCardProps } from './CartItemCard.types';
import {
  CartItemCardContainer,
  Description,
  ImageContainer,
  Price,
  ProductInfoContainer,
  Title,
} from './CartItemCard.styles';

export const CartItemCard = (props: ProductCardProps) => {
  const { item } = props;

  return (
    <CartItemCardContainer>
      <ImageContainer>
        {item?.items?.[0].images?.[0].imageUrl && (
          <Image
            src={item?.items?.[0].images?.[0].imageUrl || ''}
            alt={
              item?.items?.[0].images?.[0].imageText || 'Imagen del producto'
            }
            width={100}
            height={100}
          />
        )}
      </ImageContainer>

      <ProductInfoContainer>
        <Title>{item.brand.slice(0, 30)}</Title>
        <Description>{item.description.slice(0, 50)}</Description>
        <Price>${item?.items?.[0].sellers?.[0].commertialOffer.Price}</Price>
      </ProductInfoContainer>
    </CartItemCardContainer>
  );
};
