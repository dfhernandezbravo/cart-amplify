import React from "react";
import { Container } from "./styles";

type Props = {
  quantity: number;
};

const AvailableQuantity = ({ quantity }: Props) => {
  return <Container>Existen {quantity} disponibles</Container>;
};

export default AvailableQuantity;
