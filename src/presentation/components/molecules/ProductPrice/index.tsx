import { formattedCLP } from "@utils/helpers";
import { ProductPriceProps } from "./types";
import {
  Container,
  NormalPrice,
  FullPrice,
  OfferPriceContainer,
} from "./styles";
import DiscountFlags from "./components/DiscountFlags";

const ProductPrice = (props: ProductPriceProps) => {
  // props
  const { prices, quantity, adjustment } = props;

  // constants
  const hasDiscount = prices.offerPrice && prices.offerPrice !== prices.normalPrice;

  // methods
  const methods = {
    calculateDiscount: () => {
      return (100 - (prices.offerPrice * 100) / prices.normalPrice).toFixed();
    },
  };

  return (
    <Container>
      <OfferPriceContainer>
        {!hasDiscount && (
          <FullPrice>{formattedCLP(prices.normalPrice * quantity)}</FullPrice>
        )}
        {hasDiscount && <DiscountFlags adjustment={adjustment} prices={prices} quantity={quantity} />}
      </OfferPriceContainer>
      {hasDiscount && (
        <NormalPrice>
          Normal: {formattedCLP(prices.normalPrice * quantity)}
        </NormalPrice>
      )}
    </Container>
  );
};

export default ProductPrice;
