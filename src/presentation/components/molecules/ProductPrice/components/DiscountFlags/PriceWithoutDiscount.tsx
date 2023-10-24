import { formattedCLP } from '@utils/helpers';
import { FullPrice } from '../../styles';
import { ProductPriceProps } from '../../types';
import { PromotionType } from '@entities/cart/promotions';

const PriceWithoutDiscount = ({
  prices,
  adjustment,
  quantity,
}: ProductPriceProps) => {
  const mxnPromotion = adjustment.filter(
    (promotion) => promotion.id === PromotionType.MxN,
  );

  if (mxnPromotion.length) {
    return <FullPrice isFree={true}>Gratis</FullPrice>;
  }

  return <FullPrice>{formattedCLP(prices.normalPrice * quantity)}</FullPrice>;
};

export default PriceWithoutDiscount;
