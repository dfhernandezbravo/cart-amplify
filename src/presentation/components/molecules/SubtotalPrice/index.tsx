import { useAppSelector } from '@hooks/storeHooks';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';

const SubtotalPrice = () => {
  const { loading, cartBFF } = useAppSelector((state) => state.cart);

  return (
    <p>
      Subtotal
      {loading ? (
        <Skeleton />
      ) : (
        <span>{formattedCLP(cartBFF?.totals?.subtotal ?? 0)}</span>
      )}
    </p>
  );
};

export default SubtotalPrice;
