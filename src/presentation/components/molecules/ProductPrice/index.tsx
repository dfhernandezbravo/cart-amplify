import { ProductPriceProps } from "./types";
import {
  Container,
  DiscountPercent,
  NormalPrice,
  OfferPrice,
  OfferPriceContainer,
} from "./styles";

const ProductPrice = (props: ProductPriceProps) => {
  // props
  const { offerPrice, normalPrice } = props;

  // constants
  const hasDiscount = offerPrice !== normalPrice;

  // methods
  const methods = {
    formatPrice: (num: number) => {
      return (num / 1000).toFixed(3);
    },
    calculateDiscount: () => {
      return (100 - (offerPrice * 100) / normalPrice).toFixed();
    },
  };

  return (
    <Container>
      <OfferPriceContainer>
        <OfferPrice>${methods.formatPrice(offerPrice)}</OfferPrice>
        {hasDiscount && (
          <DiscountPercent>{methods.calculateDiscount()}%</DiscountPercent>
        )}
      </OfferPriceContainer>
      {hasDiscount && (
        <NormalPrice>Normal: ${methods.formatPrice(normalPrice)}</NormalPrice>
      )}
    </Container>
  );
};

export default ProductPrice;
