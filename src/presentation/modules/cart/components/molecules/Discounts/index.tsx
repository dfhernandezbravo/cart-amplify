import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import useBreakpoints from '@hooks/useBreakpoints';
import { valueHasChangeToast } from '@components/atoms/ToastContainer/customMessage';

import removeCouponCode from '@use-cases/cart/removeCouponCode';

import { CouponCodeWrapper, RemoveCoupon } from './styles';
import getCouponCodeId from '@utils/getCouponId';
import { Adjustments, Cart } from '@entities/cart/cart.entity';

const Discounts = () => {
  const { isXs, isMd } = useBreakpoints();
  const isMobile = isXs || isMd;

  const { cartBFF, cartId } = useAppSelector((state) => state.cart);
  const couponCode = getCouponCodeId(cartBFF as Cart);

  const dispatch = useAppDispatch();

  const removeCoupon = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    await dispatch(
      removeCouponCode({
        couponCode: (couponCode as Adjustments[])[0].id,
        cartId,
      }),
    );
    if (isMobile) return valueHasChangeToast({ position: 'top-center' });
    valueHasChangeToast();
  };

  return (
    <>
      {couponCode?.length ? (
        <>
          <CouponCodeWrapper>
            <p className="couponCode">{couponCode[0].id}</p>
            <p>${Math.abs(couponCode[0].value)}</p>
          </CouponCodeWrapper>
          <RemoveCoupon onClick={removeCoupon}>Eliminar cupón</RemoveCoupon>
        </>
      ) : null}
    </>
  );
};

export default Discounts;
