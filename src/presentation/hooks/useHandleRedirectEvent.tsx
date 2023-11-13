import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import deleteItem from '@use-cases/cart/delete-item';
import useItemWithoutStock from './useItemWithoutStock';

const useHandleRedirectEvent = () => {
  const enviromentTest = [
    'localhost',
    'https://cl-ccom-easy-host-headless.ecomm-stg.cencosud.com',
  ];

  const host = enviromentTest.includes(location.host)
    ? 'https://checkout.qa.easy.cl'
    : 'https://checkout.easy.cl';

  const [showModal, setShowModal] = useState(false);

  const { cartBFF, cartId } = useAppSelector((state) => state.cart);
  const itemWithoutStock = useItemWithoutStock(cartBFF);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const goToCheckout = () => router.push(`${host}/${cartId}`);

  const removeUnavailableItemsAndContinue = () => {
    itemWithoutStock.forEach((item) => {
      dispatch(
        deleteItem({
          cartId: cartBFF?.id ?? '',
          itemIndex: item.index as number,
        }),
      );
    });
    setShowModal(false);
    goToCheckout();
  };

  const handleGoToCheckout = () => {
    if (itemWithoutStock?.length) {
      setShowModal(true);
      return;
    }
    goToCheckout();
  };

  return {
    showModal,
    itemWithoutStock,
    setShowModal,
    removeUnavailableItemsAndContinue,
    handleGoToCheckout,
  };
};

export default useHandleRedirectEvent;
