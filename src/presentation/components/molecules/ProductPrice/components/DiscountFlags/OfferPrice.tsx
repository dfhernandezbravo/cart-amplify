import { replaceCharacter } from '@utils/replaceCharacter';
import { DiscountPercent, Price, PriceContainer } from './styles';
import { DiscountProps } from './types';
import { formattedCLP } from '@utils/helpers';

const OfferPrice = ({
  offerDiscount,
  quantity,
  offerPrice,
}: Omit<DiscountProps, ''>) => {
  const porcentage = replaceCharacter(
    offerDiscount[0].percentageDiscount,
    '-',
    '',
  );
  return (
    <PriceContainer>
      <Price>{formattedCLP(offerPrice * quantity)}</Price>
      <DiscountPercent>{porcentage}</DiscountPercent>
    </PriceContainer>
  );
};

export default OfferPrice;
