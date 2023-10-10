import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronUp, CgChevronDown } from "react-icons/cg";
import { TiDelete } from "react-icons/ti";
import Image from "next/image";
import Button from "@components/atoms/Button";

import { useAppSelector, useAppDispatch } from "@hooks/storeHooks";
import {
  ButtonContainer,
  Container,
  FormContainer,
  IconAndTextContainer,
} from "./styles";
import addCouponCode from "@use-cases/cart/addCouponCode";

type Inputs = {
  code: string;
};

const PromotionalCode = () => {
  //hooks
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // states
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");


  const { cartId, couponId } = useAppSelector(state => state.cart)
  const dispatch =useAppDispatch()

  const handleShowForm = () => {
    setIsOpen(!isOpen);
  };

  const inputCode = watch('code')

  const onSubmit = async (data: any) => {
    // TODO: call service and add logic to check if the code exists

    const response  = await dispatch(addCouponCode({couponCode:inputCode, cartId}))

    console.log({response})

    setCode(data?.code?.toUpperCase());
    reset();
  };

  const handleRemoveCoupon = () => {
    // TODO: call service and add logic after remove the code
    setCode("");
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
          {code ? (
            <span className="promotionalCode">
              {couponId} <TiDelete onClick={handleRemoveCoupon} />
            </span>
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

export default PromotionalCode;
