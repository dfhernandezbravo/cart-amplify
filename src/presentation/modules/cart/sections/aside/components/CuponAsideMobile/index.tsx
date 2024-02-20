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
        <Image
          src="/icons/general/chevron-up-m.svg"
          width={25}
          height={25}
          alt="flecha arriba"
          priority
        />
      );
    }
    return (
      <Image
        src="/icons/general/chevron-down.svg"
        width={20}
        height={20}
        alt="flecha abajo"
        priority
      />
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
          <Image
            src="/icons/cart/cupon-icon.svg"
            width={25}
            height={25}
            alt="cupon icon"
            priority
          />
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
