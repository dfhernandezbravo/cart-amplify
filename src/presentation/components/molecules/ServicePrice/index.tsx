import { useAppSelector } from '@hooks/storeHooks';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';
import useProductServices from '@hooks/useProductServices';
import { Price } from './styles';

const ServicePrice = () => {
  const { loading, cartBFF } = useAppSelector((state) => state.cart);
  const { totalServicePrice } = useProductServices();

  const total = totalServicePrice(cartBFF);

  return (
    <>
      {total > 0 ? (
        <p>
          Servicio
          {loading ? <Skeleton /> : <Price>{formattedCLP(total)}</Price>}
        </p>
      ) : null}
    </>
  );
};

export default ServicePrice;
