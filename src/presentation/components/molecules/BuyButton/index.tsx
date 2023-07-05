import Button from "@components/atoms/Button";
import { BuyButtonProps } from "./types";

const BuyButton = (props: BuyButtonProps) => {
  const { text } = props;

  const handleClickBtn = () => {
    console.log("BuyButton clicked");
  };

  return (
    <Button className="buyBtn fullWidth" onClick={handleClickBtn}>
      {text}
    </Button>
  );
};

export default BuyButton;
