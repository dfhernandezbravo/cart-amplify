import Button from '@components/atoms/Button';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import deleteItem from '@use-cases/cart/delete-item';
import { getUnavailableProduct } from '@utils/getUnavailabilityProduct';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

interface Props {
  handleSetShowModal: (value: boolean) => void;
}

const RedirectChecoutButton = ({ handleSetShowModal }: Props) => {
  const testEnviroment = [
    'https://cl-ccom-easy-host-headless.ecomm-stg.cencosud.com',
    'localhost',
  ];
  const host = testEnviroment.includes(location.host)
    ? 'https://checkout.easy.cl'
    : 'https://checkout.qa.easy.cl';

  const { cartBFF, cartId } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const itemWithoutStock = useMemo(() => {
    return cartBFF?.items?.length ? getUnavailableProduct(cartBFF) : [];
  }, [cartBFF]);

  const goToCheckout = () => {
    router.push(`${host}/${cartId}`);
  };

  const handleGoToCheckout = () => {
    if (itemWithoutStock?.length) {
      handleSetShowModal(true);
      return;
    }
    goToCheckout();
  };

  return (
    <Button
      className="cartBtn cartBtn--primary fullWidth"
      onClick={() => handleGoToCheckout()}
    >
      Continuar tu compra
    </Button>
  );
};

export default RedirectChecoutButton;
