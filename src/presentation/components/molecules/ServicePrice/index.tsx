import { useAppSelector } from '@hooks/storeHooks';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';

const ServicePrice = () => {
  const { loading, cartBFF } = useAppSelector((state) => state.cart);

  const productsWithServices = cartBFF?.items.filter(
    (item) => item.product.options?.length,
  );

  if (!productsWithServices) return null;

  return (
    <p>
      Servicio
      {loading ? (
        <Skeleton />
      ) : (
        <span>{formattedCLP(cartBFF?.totals?.subtotal ?? 0)}</span>
      )}
    </p>
  );
};

export default ServicePrice;
