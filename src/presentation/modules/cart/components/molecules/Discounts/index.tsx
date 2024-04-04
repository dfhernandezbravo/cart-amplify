import { PriceType } from '@entities/cart/promotions';
import { useAppSelector } from '@hooks/storeHooks';
import useClusterDiscounts from '@hooks/useClusterDiscounts';
import { formattedCLP } from '@utils/helpers';
import { Price, Skeleton } from './styles';
import getCouponCodeId from '@utils/getCouponId';
import { Cart } from '@entities/cart/cart.entity';
import CouponDiscounts from '../CouponDiscounts';
import { Divider } from '../../organisms/PurchaseSummary/styles';

const TMP_DISCOUNT_NAME = 'Descuentos';

const Discounts = () => {
  const { cartBFF, loading } = useAppSelector((state) => state.cart);
  const { colaboradorDiscount, expertoDiscount } = useClusterDiscounts();

  const adjustments = cartBFF?.items.flatMap((item) => item.adjustment);
  const clusters = adjustments?.filter(
    (promotion) => promotion.priceType === PriceType.offer,
  );
  const tmpDiscount = Math.abs(cartBFF?.totals?.discount ?? 0);

  const couponCode = getCouponCodeId(cartBFF as Cart);
  const couponValue =
    couponCode && couponCode[0]?.value ? Math.abs(couponCode[0].value) : 0;
  const couponId = couponCode && couponCode[0]?.id ? couponCode[0]?.id : '';

  const DiscountComponent = (total: number, name: string) => {
    return (
      <>
        {total > 0 ? (
          <p style={{ fontSize: '14px', fontWeight: 400, color: '#363f45' }}>
            {name}
            {loading ? <Skeleton /> : <Price>-{formattedCLP(total)}</Price>}
          </p>
        ) : null}
      </>
    );
  };

  if (!clusters) {
    const total = tmpDiscount - couponValue;
    return (
      <>
        {couponValue > 0 ? (
          <CouponDiscounts couponId={couponId} couponValue={couponValue} />
        ) : null}
        {DiscountComponent(total, TMP_DISCOUNT_NAME)}
        {couponValue > 0 || total > 0 ? (
          <Divider fullWidth={true} className="light" />
        ) : null}
      </>
    );
  }

  const { total: colaboradorTotal, name: colaboradorClusterName } =
    colaboradorDiscount({ clusters });
  const { total: expertoTotal, name: expertoClusterName } = expertoDiscount({
    clusters,
  });
  const tmpTotal =
    tmpDiscount - (colaboradorTotal + expertoTotal + couponValue);

  return (
    <>
      {couponValue > 0 ? (
        <CouponDiscounts couponId={couponId} couponValue={couponValue} />
      ) : null}
      {DiscountComponent(tmpTotal, TMP_DISCOUNT_NAME)}
      {DiscountComponent(expertoTotal, expertoClusterName)}
      {DiscountComponent(colaboradorTotal, colaboradorClusterName)}
      {couponValue > 0 ||
      tmpTotal > 0 ||
      expertoTotal > 0 ||
      colaboradorTotal > 0 ? (
        <Divider fullWidth={true} className="light" />
      ) : null}
    </>
  );
};

export default Discounts;
