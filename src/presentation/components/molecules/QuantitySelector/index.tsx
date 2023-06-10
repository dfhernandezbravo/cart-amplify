import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "@components/atoms/Button";
import { QuantitySelectorProps } from "./types";
import { QuantitySelectorContainer } from "./styles";

const QuantitySelector = (props: QuantitySelectorProps) => {
  const { quantity, onIncrementQuantity, onDecrementQuantity } = props;

  return (
    <QuantitySelectorContainer>
      <Button onClick={onDecrementQuantity}>
        <AiOutlineMinus />
      </Button>
      {quantity}
      <Button onClick={onIncrementQuantity}>
        <AiOutlinePlus />
      </Button>
    </QuantitySelectorContainer>
  );
};

export default QuantitySelector;
