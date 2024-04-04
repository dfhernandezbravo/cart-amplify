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
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="close-line">
                    <path
                      id="Vector"
                      d="M12.765 10.4725L18.9875 4.25L20.765 6.0275L14.5425 12.25L20.765 18.4725L18.9875 20.25L12.765 14.0275L6.54251 20.25L4.76501 18.4725L10.9875 12.25L4.76501 6.0275L6.54251 4.25L12.765 10.4725Z"
                      fill="#485760"
                    />
                  </g>
                </svg>
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
