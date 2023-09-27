import { useRouter } from "next/router";
import { useAppSelector } from "@hooks/storeHooks";
import { selectMinicart } from "@store/minicart";
import Button from "@components/atoms/Button";
import { BuyButtonProps } from "./types";

const BuyButton = (props: BuyButtonProps) => {
  const router = useRouter();
  const { cartBFF } = useAppSelector(selectMinicart);

  const { text } = props;

  const handleClickBtn = () => {
    if (cartBFF?.id) {
      router.push(`${process.env.NEXT_PUBLIC_CHECKOUT_URL}${cartBFF?.id}`);
    }
  };

  return (
    <Button className="buyBtn fullWidth" onClick={handleClickBtn}>
      {text}
    </Button>
  );
};

export default BuyButton;
