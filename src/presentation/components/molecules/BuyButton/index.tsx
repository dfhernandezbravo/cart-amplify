import { useAppSelector } from '@hooks/storeHooks';
import Button from '@components/atoms/Button';
import { BuyButtonProps } from './types';
import Link from 'next/link';

const BuyButton = (props: BuyButtonProps) => {
  const { cartBFF, isHeadless } = useAppSelector((state) => state.cart);
  const { text } = props;

  if (!cartBFF?.id) {
    return <Button className="buyBtn fullWidth">{text}</Button>;
  }

  return (
    <>
      <Link
        href={`${process.env.NEXT_PUBLIC_CHECKOUT_URL}${cartBFF?.id}`}
        target={isHeadless ? '_self' : '_parent'}
      >
        <Button className="buyBtn fullWidth">{text}</Button>
      </Link>
    </>
  );
};

export default BuyButton;
