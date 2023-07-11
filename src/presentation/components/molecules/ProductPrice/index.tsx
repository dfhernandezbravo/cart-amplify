import { formattedCLP } from "@utils/helpers";
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
  const { offerPrice, normalPrice, quantity } = props;

  // constants
  const hasDiscount = offerPrice && offerPrice !== normalPrice;

  // methods
  const methods = {
    calculateDiscount: () => {
      return (100 - (offerPrice * 100) / normalPrice).toFixed();
    },
  };

  return (
    <Container>
      <OfferPriceContainer>
        {!hasDiscount && (
          <OfferPrice>{formattedCLP(normalPrice * quantity)}</OfferPrice>
        )}
        {hasDiscount && (
          <>
            <OfferPrice>{formattedCLP(offerPrice * quantity)}</OfferPrice>
            <DiscountPercent>{methods.calculateDiscount()}%</DiscountPercent>
          </>
        )}
      </OfferPriceContainer>
      {hasDiscount && (
        <NormalPrice>
          Normal: {formattedCLP(normalPrice * quantity)}
        </NormalPrice>
      )}
    </Container>
  );
};

export default ProductPrice;
