import { useState, useEffect } from 'react';
import { useAppSelector } from '@hooks/storeHooks';
import Button from '@components/atoms/Button';
import { BuyButtonProps } from './types';
import Link from 'next/link';

const BuyButton = (props: BuyButtonProps) => {
  const { cartBFF, isHeadless } = useAppSelector((state) => state.cart);
  const { text } = props;

  //TODO: delete this conditional when hybrid is gone
  const [recursiveNumber, setRecursiveNumber] = useState(0);

  useEffect(() => {
    if (!cartBFF?.id && recursiveNumber <= 5) {
      setRecursiveNumber(recursiveNumber + 1);
    }
  }, [recursiveNumber, cartBFF]);

  if (!cartBFF?.id) {
    return <Button className="buyBtn fullWidth">{text}</Button>;
  }
  //TODO: delete this conditional when hybrid is gone
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
