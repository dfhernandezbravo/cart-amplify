import { useRouter } from "next/router";
import Button from "@components/atoms/Button";

import { useAppSelector } from "@hooks/storeHooks";


const GoToCartButton = () => {
  const router = useRouter();
  const { cartId } = useAppSelector(state => state.minicart)

  const handleClickBtn = () => {
    router.push(`/cart/${cartId}`);
  };



  return (
    <Button className="linkBtn goToCartBtn fullWidth" onClick={handleClickBtn}>
      Ir al carro de compras
    </Button>
  );
};

export default GoToCartButton;
