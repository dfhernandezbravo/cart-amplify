import { replaceCharacter } from '@utils/replaceCharacter';
import { DiscountPercent, Price, PriceContainer } from './styles';
import Flags from './Flags';
import { formattedCLP } from '@utils/helpers';
import { Adjustment } from '@entities/cart/cart.entity';

interface Props {
  brandPrice: number;
  brandDiscount: Adjustment[];
}

const BrandPrice = ({ brandPrice, brandDiscount }: Props) => {
  if (!brandPrice) return null;

  const porcentage = replaceCharacter(
    brandDiscount[0]?.percentageDiscount,
    '-',
    '',
  );
  return (
    <PriceContainer>
      <Price>{formattedCLP(brandPrice)}</Price>
      <DiscountPercent>{porcentage}</DiscountPercent>
      <Flags brandId={brandDiscount[0].id} />
    </PriceContainer>
  );
};

export default BrandPrice;
