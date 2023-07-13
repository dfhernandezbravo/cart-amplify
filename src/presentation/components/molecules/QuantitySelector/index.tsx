import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import { selectCart } from "@store/cart";
import Button from "@components/atoms/Button";
import { Textfield } from "@components/atoms/Textfield";
import updateItem from "@use-cases/cart/update-item";
import { QuantitySelectorProps } from "./types";
import { QuantitySelectorContainer } from "./styles";

const QuantitySelector = (props: QuantitySelectorProps) => {
  // props
  const { index, quantity, onIncrementQuantity, onDecrementQuantity } = props;

  // hooks
  const dispatch = useAppDispatch();
  const { cartId, loading } = useAppSelector(selectCart);

  const [quantityInput, setQuantityInput] = useState(`${quantity}`);
  const [isEditing, setIsEditing] = useState(false);

  // methods
  const methods = {
    updateQuantityInput: () => {
      const newQuantity = Number(quantityInput);
      if (newQuantity === quantity) return;

      const numberRegex = /^\d+$/; // only integers

      if (newQuantity > 0 && numberRegex.test(quantityInput)) {
        dispatch(
          updateItem({
            cartId: cartId ?? "",
            items: [{ quantity: newQuantity, index: index }],
          })
        );
      }
      setIsEditing(false);
    },
  };

  useEffect(() => {
    setQuantityInput(`${quantity}`);
  }, [quantity]);

  return (
    <QuantitySelectorContainer>
      <Button
        className="quantitySelectorBtn quantitySelectorBtn--minus"
        onClick={onDecrementQuantity}
        disabled={quantity === 1 || loading}
      >
        <AiOutlineMinus />
      </Button>
      <Textfield
        type="number"
        name="quantityInput"
        min={1}
        onFocus={() => {
          setIsEditing(true);
        }}
        onBlur={methods.updateQuantityInput}
        onChange={(e) => setQuantityInput(e.target.value)}
        value={loading || isEditing ? quantityInput : quantity}
        className="quantityInput"
        disabled={loading}
      />
      <Button
        className="quantitySelectorBtn quantitySelectorBtn--plus"
        onClick={onIncrementQuantity}
        disabled={loading}
      >
        <AiOutlinePlus />
      </Button>
    </QuantitySelectorContainer>
  );
};

export default QuantitySelector;
