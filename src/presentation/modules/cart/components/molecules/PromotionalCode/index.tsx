import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CgChevronUp, CgChevronDown } from "react-icons/cg";
import { TiDelete } from "react-icons/ti";
import Image from "next/image";
import Button from "@components/atoms/Button";

import { useAppSelector, useAppDispatch } from "@hooks/storeHooks";
import cartSlice from "@store/cart";
import {
  ButtonContainer,
  Container,
  FormContainer,
  IconAndTextContainer,
} from "./styles";
import addCouponCode from "@use-cases/cart/addCouponCode";
import removeCouponCode from "@use-cases/cart/removeCouponCode";
import showToast from "@components/atoms/ToastContainer/ToastMessage";
import { couponNoValidToast, valueHasChangeToast } from "@components/atoms/ToastContainer/customMessage";

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

  const { cartId, couponId } = useAppSelector(state => state.cart)
  const { setCouponId } = cartSlice.actions
  const dispatch = useAppDispatch()

  const handleShowForm = () => {
    setIsOpen(!isOpen);
  };

  const inputCode = watch('code')

  const onSubmit = async (data: any) => {

    const response = await dispatch(addCouponCode({ couponCode: inputCode, cartId }))

    if (response?.payload === undefined) {
      setValue('code', '')
      couponNoValidToast()
      return
    }
    valueHasChangeToast()
    dispatch(setCouponId(inputCode.toUpperCase()))
    reset();
  };

  const handleRemoveCoupon = async () => {
    await dispatch(removeCouponCode({ couponCode: couponId, cartId }))
    valueHasChangeToast()
  };


  return (
    <Container>
      <ButtonContainer onClick={handleShowForm}>
        <IconAndTextContainer>
          <Image
            src={`/icons/cart/promoCode.svg`}
            alt="promoCode-icon"
            width={24}
            height={24}
          />
          <span>Cupón de descuento</span>
        </IconAndTextContainer>
        {isOpen ? <CgChevronUp size={24} /> : <CgChevronDown size={24} />}
      </ButtonContainer>
      {isOpen ? (
        <>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Ej: GH0987"
              {...register("code", { required: true })}
            />
            <Button disabled={inputCode?.length ? false : true} className={`${inputCode?.length && 'cartBtn--primary'}`}>Aplicar</Button>
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
