import { useAppSelector } from '@hooks/storeHooks';
import { Skeleton } from '../TotalPriceCencosud/styles';
import { formattedCLP } from '@utils/helpers';
import { Divider } from '@modules/cart/components/organisms/PurchaseSummary/styles';

const TotalPriceDiscount = () => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  const discount = Math.abs(cartBFF?.totals?.discount ?? 0);

  return (
    <>
      {discount > 0 ? (
        <>
          <Divider fullWidth={true} className="light" />
          <p>
            Descuentos:{' '}
            {loading ? <Skeleton /> : <span>-{formattedCLP(discount)}</span>}
          </p>
        </>
      ) : null}
    </>
  );
};

export default TotalPriceDiscount;
