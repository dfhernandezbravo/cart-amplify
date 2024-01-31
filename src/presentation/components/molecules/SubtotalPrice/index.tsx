import { useAppSelector } from '@hooks/storeHooks';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';
import useProductServices from '@hooks/useProductServices';

const SubtotalPrice = () => {
  const { loading, cartBFF } = useAppSelector((state) => state.cart);
  const { totalServicePrice } = useProductServices();

  const servicePrice = totalServicePrice(cartBFF);
  const subtotal = cartBFF?.totals?.subtotal;
  const subtotalPrice = subtotal ? subtotal - servicePrice : 0;

  return (
    <p>
      Costo de tus productos
      {loading ? <Skeleton /> : <span>{formattedCLP(subtotalPrice)}</span>}
    </p>
  );
};

export default SubtotalPrice;
