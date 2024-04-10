import React from 'react';
import { useQuery } from 'react-query';
import getContentViewCms from '@use-cases/cms/get-content-view';
import useEventListener from '@hooks/eventListenerHooks';
import WindowsEvents from '@events/index';
import { customDispatchEvent } from '@store/events/dispatchEvents';
import { AddItemShoppingCartEvent } from '@entities/events/add-to-cart-event';
import { useRouter } from 'next/router';
import { useAppSelector } from '@hooks/storeHooks';
import { ShowcaseContainer } from './styles';
import Showcase from '@components/molecules/BitShowcase';

const RecommendedProducts = () => {
  const router = useRouter();
  const { cartId } = useAppSelector((state) => state.cart);

  const env = {
    baseURL: `${process.env.NEXT_PUBLIC_BFF_WEB_URL!}/v2`,
    apiKey: process.env.NEXT_PUBLIC_API_KEY_BFF_WEB!,
  };

  const handleRedirectToPdp = (event: any) => {
    router.push(`/${event.detail.linkText}/p`);
  };

  const handleAddProductToCart = (event: any) => {
    event.stopPropagation();
    const {
      detail: { productId, productName, brand, imageUrl, prices },
    } = event;
    const eventData: AddItemShoppingCartEvent = {
      cartId: cartId,
      product: {
        productId: productId,
        id: productId,
        productName: productName,
        brand: brand,
        imageUrl: imageUrl,
        prices: prices,
        quantity: 1,
      },
    };

    customDispatchEvent({
      name: WindowsEvents.ADD_ITEM_SHOPPING_CART,
      detail: eventData,
    });
  };

  useEventListener(
    document,
    WindowsEvents.ON_CLICK_ADD_PRODUCT_TO_CART,
    handleAddProductToCart,
  );

  useEventListener(
    document,
    WindowsEvents.ON_CLICK_PRODUCT_CARD,
    handleRedirectToPdp,
  );

  const { data, isLoading } = useQuery(['get-recommended-products'], () =>
    getContentViewCms('recommended-products'),
  );

  if (isLoading) return <p>Cargando...</p>;

  if (!data) return null;

  return (
    <ShowcaseContainer>
      <Showcase env={env} content={data[0]} />
    </ShowcaseContainer>
  );
};

export default RecommendedProducts;
