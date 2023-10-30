import { replaceCharacter } from '@utils/replaceCharacter';
import { DiscountPercent, Price, PriceContainer } from './styles';
import Flags, { FlagProps } from './Flags';
import { formattedCLP } from '@utils/helpers';
import { Adjustment } from '@entities/cart/cart.entity';
import { PromotionType } from '@entities/cart/promotions';

interface Props {
  brandPrice: number;
  brandDiscount: Adjustment[];
  quantity: number;
}

type ValidBrandValue = {
  [K in PromotionType]: K extends
    | PromotionType.CAT
    | PromotionType.CENCOPAY
    | PromotionType.CENCOPAY_SALDO
    ? K
    : never;
}[PromotionType];

const BrandPrice = ({ brandPrice, brandDiscount, quantity }: Props) => {
  if (!brandPrice) return null;

  const porcentage = replaceCharacter(
    brandDiscount[0]?.percentageDiscount,
    '-',
    '',
  );

  return (
    <PriceContainer>
      <Price>{formattedCLP(brandPrice * quantity)}</Price>
      <DiscountPercent>{porcentage}</DiscountPercent>
      <Flags brandId={brandDiscount[0].id as ValidBrandValue} />
    </PriceContainer>
  );
};

export default BrandPrice;
