import { useAppSelector } from '@hooks/storeHooks';
import SnackBars from '@components/atoms/SnackBars';
import { selectTotalProductsInCart } from '@store/cart';
import ProductCard from '@modules/cart/components/organisms/ProductCard';
import ProductCartWithoutStock from '@modules/cart/components/organisms/ProductCard/components/ProductCardWithoutStock';
import { Cart, Item } from '@entities/cart/cart.entity';
import { Container, TotalProductsContainer, Loader } from './styles';
import useItemWithoutStock from '../../../../hooks/useItemWithoutStock';
import useProductCardEvent from '@hooks/useProductCardEvent';
import useAnalytics from '@hooks/useAnalytics';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ProductAnalytics } from '@entities/analytics';

const Main = () => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);
  const itemWithoutStock = useItemWithoutStock(cartBFF as Cart);
  const totalProducts = useAppSelector(selectTotalProductsInCart);
  const { methods, updatedIndexItem } = useProductCardEvent(
    cartBFF?.id as string,
  );

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
        id: product.id,
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

  return (
    <Container>
      <TotalProductsContainer>
        Tu compra {`${totalProducts}`}
      </TotalProductsContainer>
      {/* <SnackBars description='Los valores fueron cambiados.' horizontal='center' vertical='bottom' open={OpenSnackbars} close={() => setOpenSnackbars(false)}/> */}
      <div className="items-container">
        {loading && <Loader />}
        {itemWithoutStock.length ? (
          <ProductCartWithoutStock
            items={itemWithoutStock}
            onRemoveFromCart={(index) => methods.handleRemoveFromCart(index)}
          />
        ) : null}

        {cartBFF?.items?.map((item: Item, index: number) => (
          <ProductCard
            key={index}
            item={item}
            itemStockModify={
              index === updatedIndexItem?.index
                ? (updatedIndexItem.availableQuantity as number)
                : null
            }
            onRemoveFromCart={() => {
              methods.handleRemoveFromCart(index);
            }}
            handleChangeQuantity={(quantity) =>
              methods.handleChangeQuantity(quantity, index)
            }
            index={index}
          />
        ))}
      </div>
    </Container>
  );
};

export default Main;
