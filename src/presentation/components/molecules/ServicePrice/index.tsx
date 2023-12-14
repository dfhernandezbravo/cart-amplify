import { useAppSelector } from '@hooks/storeHooks';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';
import useProductServices from '@hooks/useProductServices';

const ServicePrice = () => {
  const { loading, cartBFF } = useAppSelector((state) => state.cart);
  const { totalServicePrice } = useProductServices();

  const total = totalServicePrice(cartBFF);

  return (
    <>
      {total > 0 ? (
        <p>
          Servicio
          {loading ? <Skeleton /> : <span>{formattedCLP(total)}</span>}
        </p>
      ) : null}
    </>
  );
};

export default ServicePrice;
