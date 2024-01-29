import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import Button from '@components/atoms/Button';
import { BuyButtonProps } from './types';
import Link from 'next/link';
import { environments } from '../../../../configs/env';
import cartSlice from '@store/cart';

const BuyButton = (props: BuyButtonProps) => {
  const { cartBFF, isHeadless } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { text } = props;
  const { setCartAsideIsOpen } = cartSlice.actions;

  //TODO: delete this conditional when hybrid is gone
  const [recursiveNumber, setRecursiveNumber] = useState(0);
  const channel = cartBFF?.channel;
  const FONOCOMPRA = 'fonocompra';

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
        href={
          !isHeadless && channel === FONOCOMPRA
            ? `${environments.hybridDomain}checkout`
            : `${environments.checkoutDomain}${cartBFF?.id}`
        }
        target={isHeadless ? '_self' : '_parent'}
        onClick={() => dispatch(setCartAsideIsOpen(false))}
      >
        <Button className="buyBtn fullWidth">{text}</Button>
      </Link>
    </>
  );
};

export default BuyButton;
