import Flags from './Flags';
import { formattedCLP } from '@utils/helpers';
import { useAppSelector } from '@hooks/storeHooks';
import { replaceCharacter } from '@utils/replaceCharacter';
import { Adjustment } from '@entities/cart/cart.entity';
import { PromotionType } from '@entities/cart/promotions';
import { DiscountPercent, Price, PriceContainer } from './styles';
import { validateCencopayId } from '@utils/validateCencopayId';

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
  const { isCencopayActive } = useAppSelector((state) => state.cart);

  if (!brandPrice) return null;
  const isCencoPay = validateCencopayId(brandDiscount[0].id);

  if (isCencoPay && !isCencopayActive) return null;

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
