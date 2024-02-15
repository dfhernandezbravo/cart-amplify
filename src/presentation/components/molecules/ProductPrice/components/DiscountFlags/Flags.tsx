import { PromotionType } from '@entities/cart/promotions';
import Image from 'next/image';

export interface FlagProps {
  brandId:
    | PromotionType.CAT
    | PromotionType.CENCOPAY
    | PromotionType.CENCOPAY_SALDO;
}

const Flag = ({ brandId }: FlagProps) => {
  const source = {
    CAT: '/icons/cart/tc-cencosud.svg',
    CENCOPAY: '/icons/cart/cencopay-icon.svg',
    CENCOPAY_SALDO: '/icons/cart/cencopay-saldo.svg',
  };

  return (
    <Image
      src={source[brandId]}
      width={40}
      height={40}
      alt={`icon-${brandId}`}
      priority
    />
  );
};

export default Flag;
