import { useAppSelector } from '@hooks/storeHooks';
import { Cart } from '@entities/cart/cart.entity';
import useItemWithoutStock from '@hooks/useItemWithoutStock';
import ProductCardUnavailable from './components/ProductCardUnavailable';

const ProductsUnavailable = () => {
  const { cartBFF } = useAppSelector((state) => state.cart);

  const { productCannotBeDelivered, productWithoutStock } = useItemWithoutStock(
    cartBFF as Cart,
  );

  return (
    <>
      {productCannotBeDelivered.length ? (
        <ProductCardUnavailable items={productCannotBeDelivered} />
      ) : null}
      {productWithoutStock.length ? (
        <ProductCardUnavailable items={productWithoutStock} />
      ) : null}
    </>
  );
};

export default ProductsUnavailable;
