import { useAppSelector } from '@hooks/storeHooks';
import { formattedCLP } from '@utils/helpers';
import { Skeleton } from '../TotalPriceCencosud/styles';

const ShippinPrice = () => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  return (
    <>
      {cartBFF?.totals?.shippingPrice ? (
        <p>
          Costo de envío desde{' '}
          {loading ? (
            <Skeleton />
          ) : (
            <span>{formattedCLP(cartBFF?.totals?.shippingPrice)}</span>
          )}
        </p>
      ) : null}
    </>
  );
};

export default ShippinPrice;
