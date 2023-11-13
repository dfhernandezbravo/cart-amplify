import { useRouter } from 'next/router';
import { useAppSelector } from '@hooks/storeHooks';
import Button from '@components/atoms/Button';
import { BuyButtonProps } from './types';
import Link from 'next/link';

const BuyButton = (props: BuyButtonProps) => {
  const router = useRouter();
  const { cartBFF, hasHybridation } = useAppSelector((state) => state.cart);

  const { text } = props;

  const handleClickBtn = () => {
    if (cartBFF?.id) {
      router.push(`${process.env.NEXT_PUBLIC_CHECKOUT_URL}${cartBFF?.id}`);
    }
  };

  return (
    <>
      {!hasHybridation ? (
        <Button className="buyBtn fullWidth" onClick={handleClickBtn}>
          {text}
        </Button>
      ) : (
        <Link
          href={`${process.env.NEXT_PUBLIC_CHECKOUT_URL}${cartBFF?.id}`}
          target="_parent"
        >
          <Button className="buyBtn fullWidth">{text}</Button>
        </Link>
      )}
    </>
  );
};

export default BuyButton;
