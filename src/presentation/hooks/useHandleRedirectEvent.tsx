import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from './storeHooks';
import deleteItem from '@use-cases/cart/delete-item';
import useItemWithoutStock from './useItemWithoutStock';
import { getUnavailableProduct } from '@utils/getUnavailabilityProduct';
import { environments } from '../../configs/env';
import { Cart } from '@entities/cart/cart.entity';

const useHandleRedirectEvent = () => {
  const [showModal, setShowModal] = useState(false);

  const { cartBFF, cartId, isEnabledCheckoutV1 } = useAppSelector(
    (state) => state.cart,
  );
  const {
    joinProductUnavailable,
    productCannotBeDelivered,
    productWithoutStock,
  } = useItemWithoutStock(cartBFF as Cart);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const validateItemWithoutStock = (cart: any) => {
    return getUnavailableProduct(cart);
  };
  console.log('isEnabledCheckoutV1', isEnabledCheckoutV1);
  const goToCheckout = () => {
    const checkoutUrl = isEnabledCheckoutV1
      ? environments.checkoutDomain
      : environments.checkoutDomainV2;
    router.push(`${checkoutUrl}/${cartId}`);
  };

  const handleState = () => {
    setShowModal(false);
    goToCheckout();
  };
  const handleGoToCheckout = () => {
    if (joinProductUnavailable.length > 0) {
      setShowModal(true);
      return;
    }
    goToCheckout();
  };

  const removeUnavailableItemsAndContinue = useCallback(async () => {
    if (joinProductUnavailable.length > 0) {
      const response = await dispatch(
        deleteItem({
          cartId: cartBFF?.id ?? '',
          itemIndex: joinProductUnavailable[0].index as number,
          sentFrom: 'CART',
        }),
      );
      const updatedCart = validateItemWithoutStock(response.payload);

      if (updatedCart.joinProductUnavailable.length > 0) {
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
    productCannotBeDelivered,
    productWithoutStock,
    joinProductUnavailable,
    setShowModal,
    removeUnavailableItemsAndContinue,
    handleGoToCheckout,
  };
};

export default useHandleRedirectEvent;
