import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "@components/atoms/Button";
import { QuantitySelectorProps } from "./types";
import { QuantitySelectorContainer } from "./styles";
import { Textfield } from "@components/atoms/Textfield";
import { useAppDispatch } from "@hooks/storeHooks";
import cartSlice from "@store/cart";

const QuantitySelector = (props: QuantitySelectorProps) => {
  // hooks
  const dispatch = useAppDispatch();

  // store actions
  const { setUpdateProductQuantity } = cartSlice.actions;

  // props
  const { item, quantity, onIncrementQuantity, onDecrementQuantity } = props;

  const handleOnChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    const numberRegex = /^\d+$/; // only integers

    if (newQuantity > 0 && numberRegex.test(e.target.value)) {
      dispatch(setUpdateProductQuantity({ item, newQuantity }));
    }
  };

  return (
    <QuantitySelectorContainer>
      <Button
        className="quantitySelectorBtn quantitySelectorBtn--minus"
        onClick={onDecrementQuantity}
      >
        <AiOutlineMinus />
      </Button>
      <Textfield
        type="number"
        name="quantityInput"
        min={1}
        onChange={handleOnChangeQuantity}
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
