import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import useBreakpoints from '@hooks/useBreakpoints';
import { valueHasChangeToast } from '@components/atoms/ToastContainer/customMessage';
import removeCouponCode from '@use-cases/cart/removeCouponCode';
import {
  CouponContainer,
  CouponName,
  CouponNameContainer,
  CouponPrice,
  RemoveButton,
} from './styles';
import { formattedCLP } from '@utils/helpers';
import { Skeleton } from '../Discounts/styles';
import { CouponProps } from './types';

const CouponDiscounts = ({ couponId, couponValue }: CouponProps) => {
  const { isXs, isMd } = useBreakpoints();
  const { cartId, loading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const isMobile = isXs || isMd;

  const removeCoupon = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(
      removeCouponCode({
        couponCode: couponId,
        cartId,
      }),
    );
    if (isMobile) return valueHasChangeToast({ position: 'top-center' });
    valueHasChangeToast();
  };

  return (
    <>
      <CouponContainer>
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <CouponNameContainer>
              <CouponName>{couponId}</CouponName>
              <RemoveButton onClick={removeCoupon}>
                <Image
                  src="/icons/cart/close-line.svg"
                  width={18}
                  height={18}
                  alt="close-line"
                />
              </RemoveButton>
            </CouponNameContainer>
            <CouponPrice>-{formattedCLP(couponValue)}</CouponPrice>
          </>
        )}
      </CouponContainer>
    </>
  );
};

export default CouponDiscounts;
