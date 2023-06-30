import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronUp, CgChevronDown } from "react-icons/cg";
import { MdOutlineDiscount } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import Button from "@components/atoms/Button";
import { ButtonContainer, Container, FormContainer } from "./styles";

type Inputs = {
  code: string;
};

const PromotionalCode = () => {
  //hooks
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  // states
  const [isOpen, setIsOpen] = useState(true);
  const [code, setCode] = useState("");

  const handleShowForm = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (data: any) => {
    // TODO: call service and add logic to check if the code exists
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
        <MdOutlineDiscount />
        Ingresa tu código promocional
        {isOpen ? <CgChevronUp size={24} /> : <CgChevronDown size={24} />}
      </ButtonContainer>
      {isOpen ? (
        <>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Ej: GH0987"
              {...register("code", { required: true })}
            />
            <Button>Aplicar</Button>
          </FormContainer>
          {errors.code && (
            <span className="promotionalCodeError">
              Por favor, ingresa un cupón.
            </span>
          )}
          {code ? (
            <span className="promotionalCode">
              {code} <TiDelete onClick={handleRemoveCoupon} />
            </span>
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

export default PromotionalCode;
