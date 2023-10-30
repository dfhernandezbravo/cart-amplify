import { formattedCLP } from '@utils/helpers';
import { ProductPriceProps } from './types';
import DiscountFlags from './components/DiscountFlags';
import PriceWithoutDiscount from './components/DiscountFlags/PriceWithoutDiscount';
import { Container, NormalPrice, OfferPriceContainer } from './styles';

const ProductPrice = (props: ProductPriceProps) => {
  // props
  const { prices, quantity, adjustment } = props;

  // constants
  const hasDiscount =
    (prices.offerPrice && prices.offerPrice !== prices.normalPrice) ||
    (prices.brandPrice && prices.brandPrice !== prices.normalPrice);

  return (
    <Container>
      <OfferPriceContainer>
        {!hasDiscount && (
          <PriceWithoutDiscount
            adjustment={adjustment}
            prices={prices}
            quantity={quantity}
          />
        )}
        {hasDiscount && (
          <DiscountFlags
            adjustment={adjustment}
            prices={prices}
            quantity={quantity}
          />
        )}
      </OfferPriceContainer>
    </Container>
  );
};

export default ProductPrice;
