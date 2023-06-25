import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "@hooks/storeHooks";
import { updateProductQuantity } from "@store/cart";
import Button from "@components/atoms/Button";
import { Textfield } from "@components/atoms/Textfield";
import { QuantitySelectorProps } from "./types";
import { QuantitySelectorContainer } from "./styles";

const QuantitySelector = (props: QuantitySelectorProps) => {
  // hooks
  const dispatch = useAppDispatch();

  // props
  const { item, quantity, onIncrementQuantity, onDecrementQuantity } = props;

  // methods
  const methods = {
    handleOnChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = Number(e.target.value);
      const numberRegex = /^\d+$/; // only integers

      if (newQuantity > 0 && numberRegex.test(e.target.value)) {
        dispatch(updateProductQuantity({ item, newQuantity }));
      }
    },
  };

  return (
    <QuantitySelectorContainer>
      <Button
        className="quantitySelectorBtn quantitySelectorBtn--minus"
        onClick={onDecrementQuantity}
        disabled={quantity === 1}
      >
        <AiOutlineMinus />
      </Button>
      <Textfield
        type="number"
        name="quantityInput"
        min={1}
        onChange={methods.handleOnChangeQuantity}
        value={quantity}
        className="quantityInput"
      />
      <Button
        className="quantitySelectorBtn quantitySelectorBtn--plus"
        onClick={onIncrementQuantity}
      >
        <AiOutlinePlus />
      </Button>
    </QuantitySelectorContainer>
  );
};

export default QuantitySelector;
