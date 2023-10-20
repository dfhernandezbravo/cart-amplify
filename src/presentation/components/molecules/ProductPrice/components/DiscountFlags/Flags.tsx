import { PromotionType } from '@entities/cart/promotions';
import Image from 'next/image';

interface Props {
  brandId: string;
}

const Flag = ({ brandId }: Props) => {
  switch (brandId) {
    case PromotionType.CAT:
      return (
        <Image
          src={'/icons/cart/tc-cencosud.svg'}
          width={40}
          height={40}
          alt="cencosud-icon"
        />
      );
    case PromotionType.CENCOPAY:
      return (
        <Image
          src={'/icons/cart/cencopay-icon.svg'}
          width={40}
          height={40}
          alt="cencopay-icon"
        />
      );
    case PromotionType.CENCOPAY_SALDO:
      return (
        <Image
          src={'/icons/cart/cencopay-saldo.svg'}
          width={40}
          height={40}
          alt="cencopay-saldo-icon"
        />
      );
    default:
      return null;
  }
};

export default Flag;
