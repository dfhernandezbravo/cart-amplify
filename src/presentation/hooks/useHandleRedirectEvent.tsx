import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import deleteItem from '@use-cases/cart/delete-item';
import useItemWithoutStock from './useItemWithoutStock';
import { getUnavailableProduct } from '@utils/getUnavailabilityProduct';

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

  const validateItemWithoutStock = (cart: any) => {
    return cartBFF?.items?.length ? getUnavailableProduct(cart) : [];
  };
  const unavailableItems = validateItemWithoutStock(cartBFF);

  const goToCheckout = () => router.push(`${host}/${cartId}`);

  const handleState = () => {
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

  const removeUnavailableItemsAndContinue = useCallback(async () => {
    if (unavailableItems.length > 0) {
      const response = await dispatch(
        deleteItem({
          cartId: cartBFF?.id ?? '',
          itemIndex: unavailableItems[0].index as number,
        }),
      );
      const updatedCart = validateItemWithoutStock(response.payload);
      if (updatedCart.length > 0) {
        removeUnavailableItemsAndContinue();
        router.push(router.asPath);
      } else {
        handleState();
      }
    } else {
      handleState();
    }
  }, [cartBFF]);

  return {
    showModal,
    itemWithoutStock,
    setShowModal,
    removeUnavailableItemsAndContinue,
    handleGoToCheckout,
  };
};

export default useHandleRedirectEvent;
