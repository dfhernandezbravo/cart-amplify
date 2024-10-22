import { useState } from 'react';
import Image from 'next/image';
import Button from '@components/atoms/Button';
import {
  StateCuponProps,
  StatePropValue,
} from '../HaderAsideMobile/HeaderAsideMobile.types';
import cartSlice from '@store/cart';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import addCouponCode from '@use-cases/cart/addCouponCode';
import { Container, IconAndTextContainer, InputCuponContainer } from './styles';
import {
  couponNoValidToast,
  valueHasChangeToast,
} from '@components/atoms/ToastContainer/customMessage';
import { Input } from '@components/atoms/Textfield/Textfield.styles';

type Props = StateCuponProps & StatePropValue;

const CuponAsideMobile = ({
  openDetails,
  isCuponContainerOpen,
  setIsCuponContainerOpen,
}: Props) => {
  const [couponCodeValue, setCouponCodeValue] = useState('');

  const dispatch = useAppDispatch();
  const { cartBFF } = useAppSelector((state) => state.cart);

  const renderChevron = () => {
    if (isCuponContainerOpen) {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0002 10.828L7.05023 15.778L5.63623 14.364L12.0002 8L18.3642 14.364L16.9502 15.778L12.0002 10.828Z"
            fill="#1A1A1A"
          />
        </svg>
      );
    }
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 -10 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.99999 5.17192L11.95 0.221924L13.364 1.63592L6.99999 7.99992L0.635986 1.63592L2.04999 0.221924L6.99999 5.17192Z"
          fill="#333333"
        />
      </svg>
    );
  };

  const handleCouponCode = async () => {
    const data = {
      couponCode: couponCodeValue,
      cartId: cartBFF?.id as string,
    };
    const response = await dispatch(addCouponCode(data));
    if (response?.payload === undefined) {
      couponNoValidToast({ position: 'top-center' });
      setCouponCodeValue('');
      return;
    }
    valueHasChangeToast({ position: 'top-center' });
  };

  return (
    <Container openDetails={openDetails}>
      <div
        className="add-cupon--header"
        onClick={() => setIsCuponContainerOpen(!isCuponContainerOpen)}
      >
        <IconAndTextContainer>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9001 2.09961L20.7991 3.51461L22.2131 13.4146L13.0211 22.6066C12.8336 22.7941 12.5793 22.8994 12.3141 22.8994C12.0489 22.8994 11.7946 22.7941 11.6071 22.6066L1.70709 12.7066C1.51962 12.5191 1.41431 12.2648 1.41431 11.9996C1.41431 11.7344 1.51962 11.4801 1.70709 11.2926L10.9001 2.09961ZM11.6071 4.22161L3.82809 11.9996L12.3141 20.4846L20.0921 12.7066L19.0321 5.28161L11.6071 4.22161ZM13.7271 10.5856C13.3519 10.2103 13.1412 9.70139 13.1413 9.17076C13.1414 8.90801 13.1932 8.64785 13.2938 8.40513C13.3944 8.1624 13.5418 7.94186 13.7276 7.75611C13.9134 7.57035 14.134 7.42302 14.3768 7.32251C14.6195 7.22201 14.8797 7.1703 15.1424 7.17035C15.6731 7.17044 16.1819 7.38133 16.5571 7.75661C16.9322 8.13189 17.1429 8.64083 17.1429 9.17146C17.1428 9.7021 16.9319 10.211 16.5566 10.5861C16.1813 10.9613 15.6724 11.172 15.1417 11.1719C14.6111 11.1718 14.1022 10.9609 13.7271 10.5856Z"
              fill="#167CBC"
            />
          </svg>
          <span>Cupón de descuento</span>
        </IconAndTextContainer>

        <div>{renderChevron()}</div>
      </div>

      <InputCuponContainer isCuponContainerOpen={isCuponContainerOpen}>
        <div className="add-cupon--input-container">
          <Input
            type="text"
            value={couponCodeValue}
            placeholder="Ingresa tu cupón"
            onChange={(value) => setCouponCodeValue(value.target.value)}
            style={{
              border: '1px solid #B4C2CB',
            }}
          />
        </div>
        <div className="button-container">
          <Button
            className="cartBtn cartBtn--primary fullWidth"
            disabled={!couponCodeValue}
            onClick={() => {
              handleCouponCode();
            }}
          >
            Aplicar
          </Button>
        </div>
      </InputCuponContainer>
    </Container>
  );
};

export default CuponAsideMobile;
