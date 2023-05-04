import Image from "next/image";

import { ProductCardProps } from "./cartItemCard.types";
import { CartItemCardContainer, Description, ImageContainer, Price, ProductInfoContainer, Title } from "./cartItemCard.styles";

const CartItemCard = (props: ProductCardProps) => {

  const { item } = props;

  return (
    <CartItemCardContainer>
      <ImageContainer>
        <Image
          src={item.image}
          alt={item.title}
          width={100}
          height={100}
        />  
      </ImageContainer>    

      <ProductInfoContainer>
        <Title>{item.title.slice(0, 30)}</Title>
        <Description>{item.description.slice(0, 50)}</Description>
        <Price>${item.price}</Price>

      </ProductInfoContainer>
    </CartItemCardContainer>
  )
};
export default CartItemCard;