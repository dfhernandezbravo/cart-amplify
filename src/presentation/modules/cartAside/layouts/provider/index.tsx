import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { COOKIES } from '@entities/cart/cookies';
import { useAppSelector } from '@hooks/storeHooks';

interface Props {
  children: React.ReactNode;
}

const CartAsideProvider = ({ children }: Props) => {
  const { cartBFF } = useAppSelector((state) => state.cart);
  const channel = cartBFF?.channel;

  useEffect(() => {
    if (!channel) return;
    Cookies.set(COOKIES.CHANNEL, channel);
  });

  return <>{children}</>;
};

export default CartAsideProvider;
