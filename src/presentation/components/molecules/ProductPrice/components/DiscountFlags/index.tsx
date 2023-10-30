import ClusterPrice from './ClusterPrice';
import OfferPrice from './OfferPrice';
import BrandPrice from './BrandPrice';
import { formattedCLP } from '@utils/helpers';
import { ProductPriceProps } from '../../types';
import { PriceType, PromotionType } from '@entities/cart/promotions';
import { FullPrice } from '../../styles';
import { PricesContainer } from './styles';
import StrikethroughPrice from './StrikethroughPrice';

const DiscountFlags = ({ prices, adjustment, quantity }: ProductPriceProps) => {
  const { offerPrice, brandPrice } = prices;
  const offerDiscount = adjustment?.filter(
    (promotion) => promotion.priceType === PriceType.offer,
  );

  const brandDiscount = adjustment?.filter(
    (promotion) => promotion.priceType === PriceType.brand,
  );

  const offerId = offerDiscount[0]?.id;

  const isCluster =
    offerId === PromotionType.EXPERTO_PREFERENTE ||
    offerId === PromotionType.EXPERTO ||
    offerId === PromotionType.COLABOLADOR;

  const NormalPrice = () => {
    return <FullPrice>{formattedCLP(prices.normalPrice * quantity)}</FullPrice>;
  };

  if (offerPrice && brandPrice && offerPrice <= brandPrice) {
    return (
      <OfferPrice
        offerDiscount={offerDiscount}
        offerPrice={offerPrice}
        quantity={quantity}
      />
    );
  }

  if (!offerPrice && brandPrice) {
    return (
      <PricesContainer>
        <BrandPrice
          brandPrice={brandPrice}
          brandDiscount={brandDiscount}
          quantity={quantity}
        />
        <NormalPrice />
      </PricesContainer>
    );
  }

  if (offerPrice && !brandPrice && isCluster) {
    return (
      <PricesContainer>
        <ClusterPrice
          offerDiscount={offerDiscount}
          offerPrice={offerPrice}
          quantity={quantity}
        />
        <StrikethroughPrice prices={prices} quantity={quantity} />
      </PricesContainer>
    );
  }

  if (offerPrice && brandPrice && isCluster) {
    return (
      <PricesContainer>
        <BrandPrice
          brandPrice={brandPrice}
          brandDiscount={brandDiscount}
          quantity={quantity}
        />
        <ClusterPrice
          offerDiscount={offerDiscount}
          offerPrice={offerPrice}
          quantity={quantity}
        />
        <StrikethroughPrice prices={prices} quantity={quantity} />
      </PricesContainer>
    );
  }

  return (
    <PricesContainer>
      <BrandPrice
        brandPrice={brandPrice as number}
        brandDiscount={brandDiscount}
        quantity={quantity}
      />
      <OfferPrice
        offerDiscount={offerDiscount}
        offerPrice={offerPrice as number}
        quantity={quantity}
      />
      <StrikethroughPrice prices={prices} quantity={quantity} />
    </PricesContainer>
  );
};

export default DiscountFlags;
