import { ProductAnalytics } from '@entities/analytics';
import { useAppSelector } from '@hooks/storeHooks';
import useAnalytics from '@hooks/useAnalytics';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const AnalyticsProvider = ({ children }: Props) => {
  const { cartBFF } = useAppSelector((state) => state.cart);

  const {
    methods: { sendPageviewVirtualEvent, sendCustomCart },
  } = useAnalytics();

  const { asPath } = useRouter();

  const impressionData = (): ProductAnalytics[] => {
    if (!cartBFF || !cartBFF.items) {
      return [];
    }

    const data: ProductAnalytics[] = cartBFF.items.map(
      ({ product }, index) => ({
        name: product.description,
        id: product.sku,
        price: product.prices.normalPrice.toString(),
        brand: product.brand,
        category: product.category,
        variant: '',
        quantity: cartBFF.items[index].quantity,
        dimension1: product.productId || '',
        dimension2: product.sku,
        dimension3: product.description,
      }),
    );
    return data;
  };

  useEffect(() => {
    sendPageviewVirtualEvent({
      event: 'PageviewVirtual',
      page: asPath,
      title: 'Checkout - cart',
      location: window.location.origin,
    });

    const productsImpression = impressionData();
    sendCustomCart({
      event: 'customCart',
      title: 'Cart',
      ecommerce: {
        checkout: {
          actionField: {
            step: '1',
            action: 'checkout',
          },
        },
        products: productsImpression,
      },
    });
  }, []);

  return <>{children} </>;
};

export default AnalyticsProvider;
