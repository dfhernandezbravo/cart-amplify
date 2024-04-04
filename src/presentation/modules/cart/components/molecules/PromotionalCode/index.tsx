import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { CgChevronUp, CgChevronDown } from 'react-icons/cg';
import { TiDelete } from 'react-icons/ti';
import {
  couponNoValidToast,
  valueHasChangeToast,
} from '@components/atoms/ToastContainer/customMessage';
import Button from '@components/atoms/Button';
import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import addCouponCode from '@use-cases/cart/addCouponCode';
import removeCouponCode from '@use-cases/cart/removeCouponCode';
import {
  ButtonContainer,
  Container,
  FormContainer,
  IconAndTextContainer,
} from './styles';

type Inputs = {
  code: string;
};

const PromotionalCode = () => {
  //hooks
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // states
  const [isOpen, setIsOpen] = useState(false);

  const { cartId, cartBFF } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleShowForm = () => {
    setIsOpen(!isOpen);
  };

  const inputCode = watch('code');

  const onSubmit = async (data: any) => {
    const response = await dispatch(
      addCouponCode({ couponCode: inputCode, cartId }),
    );

    if (response?.payload === undefined) {
      setValue('code', '');
      couponNoValidToast();
      return;
    }
    valueHasChangeToast();
    // dispatch(setCouponId(inputCode.toUpperCase()));
    reset();
  };

  const couponId = cartBFF?.adjustments?.filter(
    (adjusment) => adjusment.type === 'coupon',
  )[0]?.id;

  const handleRemoveCoupon = async () => {
    await dispatch(
      removeCouponCode({ couponCode: couponId as string, cartId }),
    );
    valueHasChangeToast();
  };

  return (
    <Container>
      <ButtonContainer onClick={handleShowForm}>
        <IconAndTextContainer>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="promo-code" clip-path="url(#clip0_1438_5928)">
              <g id="Group">
                <path
                  id="Vector"
                  d="M10.9001 2.1001L20.7991 3.5151L22.2131 13.4151L13.0211 22.6071C12.8336 22.7946 12.5793 22.8999 12.3141 22.8999C12.0489 22.8999 11.7946 22.7946 11.6071 22.6071L1.70709 12.7071C1.51962 12.5196 1.41431 12.2653 1.41431 12.0001C1.41431 11.7349 1.51962 11.4806 1.70709 11.2931L10.9001 2.1001ZM11.6071 4.2221L3.82809 12.0001L12.3141 20.4851L20.0921 12.7071L19.0321 5.2821L11.6071 4.2221ZM13.7271 10.5861C13.3519 10.2108 13.1412 9.70188 13.1413 9.17124C13.1414 8.9085 13.1932 8.64834 13.2938 8.40561C13.3944 8.16289 13.5418 7.94235 13.7276 7.7566C13.9134 7.57084 14.134 7.42351 14.3768 7.323C14.6195 7.2225 14.8797 7.17079 15.1424 7.17084C15.6731 7.17093 16.1819 7.38182 16.5571 7.7571C16.9322 8.13238 17.1429 8.64132 17.1429 9.17195C17.1428 9.70259 16.9319 10.2114 16.5566 10.5866C16.1813 10.9617 15.6724 11.1724 15.1417 11.1724C14.6111 11.1723 14.1022 10.9614 13.7271 10.5861Z"
                  fill="#167CBC"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1438_5928">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Cupón de descuento</span>
        </IconAndTextContainer>
        {isOpen ? <CgChevronUp size={24} /> : <CgChevronDown size={24} />}
      </ButtonContainer>
      {isOpen ? (
        <>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Ej: GH0987"
              {...register('code', { required: true })}
            />
            <Button
              disabled={inputCode?.length ? false : true}
              className={`${inputCode?.length && 'cartBtn--primary'}`}
            >
              Aplicar
            </Button>
          </FormContainer>
          {errors.code && (
            <span className="promotionalCodeError">
              Por favor, ingresa un cupón.
            </span>
          )}
          {couponId ? (
            <span className="promotionalCode">
              {couponId.toUpperCase()} <TiDelete onClick={handleRemoveCoupon} />
            </span>
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

export default PromotionalCode;
