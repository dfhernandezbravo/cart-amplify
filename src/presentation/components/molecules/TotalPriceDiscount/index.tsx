import { useAppSelector } from '@hooks/storeHooks';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';

const TotalPriceDiscount = () => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  return (
    <p>
      Descuentos:{' '}
      {loading ? (
        <Skeleton />
      ) : (
        <span>-{formattedCLP(Math.abs(cartBFF?.totals?.discount ?? 0))}</span>
      )}
    </p>
  );
};

export default TotalPriceDiscount;
